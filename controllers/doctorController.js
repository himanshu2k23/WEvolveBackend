const User = require('../models/User');

const formatNextSlot = (availability) => {
  if (!Array.isArray(availability) || availability.length === 0) return 'No slots';

  const daysOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = new Date().getDay();

  const sorted = [...availability].sort((a, b) => {
    const aDay = daysOrder.indexOf(a.day);
    const bDay = daysOrder.indexOf(b.day);
    const aOffset = (aDay - todayIndex + 7) % 7;
    const bOffset = (bDay - todayIndex + 7) % 7;
    return aOffset - bOffset;
  });

  const next = sorted[0];
  const nextDayIndex = daysOrder.indexOf(next.day);
  const dayDifference = (nextDayIndex - todayIndex + 7) % 7;

  const dayLabel = dayDifference === 0 ? 'Today' : dayDifference === 1 ? 'Tomorrow' : next.day;
  return `${dayLabel}, ${next.startTime}`;
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' });

    const formattedDoctors = doctors.map((doc) => ({
      id: doc._id,
      category: doc.doctorProfile.category,
      name: `${doc.firstName} ${doc.lastName}`,
      gender: doc.doctorProfile.gender,
      experience: doc.doctorProfile.experience,
      price: doc.doctorProfile.price,
      duration: doc.doctorProfile.duration,
      expertise: doc.doctorProfile.expertise,
      languages: doc.doctorProfile.languages,
      image: doc.doctorProfile.image,
      nextSlot: formatNextSlot(doc.doctorProfile.availability)
    }));

    res.json(formattedDoctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error while fetching doctors' });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findOne({ _id: req.params.id, role: 'doctor' });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const formatted = {
      id: doctor._id,
      category: doctor.doctorProfile.category,
      name: `${doctor.firstName} ${doctor.lastName}`,
      gender: doctor.doctorProfile.gender,
      experience: doctor.doctorProfile.experience,
      price: doctor.doctorProfile.price,
      duration: doctor.doctorProfile.duration,
      expertise: doctor.doctorProfile.expertise,
      languages: doctor.doctorProfile.languages,
      availability: doctor.doctorProfile.availability,
      image: doctor.doctorProfile.image
    };

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Server error while fetching doctor' });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById
};
