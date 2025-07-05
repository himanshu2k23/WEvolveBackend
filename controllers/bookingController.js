const Booking = require('../models/Booking');
const User = require('../models/User');

const createBooking = async (req, res) => {
  try {
    const { doctorId, date, meetingLink, notes } = req.body;

    const userId = req.user._id;

    // Validate inputs
    if (!doctorId || !date) {
      return res.status(400).json({ message: 'doctorId and date are required' });
    }

    const doctor = await User.findOne({ _id: doctorId, role: 'doctor' });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Optional: Check for booking conflict
    const existing = await Booking.findOne({
      doctor: doctorId,
      date: new Date(date)
    });

    if (existing) {
      return res.status(409).json({ message: 'This slot is already booked.' });
    }

    const booking = new Booking({
      user: userId,
      doctor: doctorId,
      date: new Date(date),
      meetingLink,
      notes
    });

    await booking.save();

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Server error during booking creation' });
  }
};

const getBookings = async (req, res) => {
  try {
    const role = req.user.role;
    const userId = req.user._id;

    let bookings;

    if (role === 'user') {
      bookings = await Booking.find({ user: userId })
        .populate('doctor', 'firstName lastName')
        .populate('user', 'firstName lastName')
        .sort({ date: -1 });
    } else if (role === 'doctor') {
      bookings = await Booking.find({ doctor: userId })
        .populate('doctor', 'firstName lastName')
        .populate('user', 'firstName lastName')
        .sort({ date: -1 });
    } else {
      return res.status(403).json({ message: 'Access denied: Invalid role' });
    }

    const formatted = bookings.map(b => ({
      id: b._id,
      date: b.date,
      status: b.status,
      meetingLink: b.meetingLink,
      notes: b.notes,
      createdAt: b.createdAt,
      doctorName: `${b.doctor.firstName} ${b.doctor.lastName}`,
      userName: `${b.user.firstName} ${b.user.lastName}`
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Booking fetch error:', err);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const requesterId = req.user._id;
    const requesterRole = req.user.role;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the requester is either the user or the doctor
    if (
      booking.user.toString() !== requesterId.toString() &&
      booking.doctor.toString() !== requesterId.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    // Update status
    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (err) {
    console.error('Cancel booking error:', err);
    res.status(500).json({ message: 'Server error during booking cancellation' });
  }
};

module.exports = {
  createBooking,
  getBookings,
  cancelBooking
};
