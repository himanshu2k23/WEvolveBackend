const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a normal user (customer)
const registerUser = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password,
      age, gender, primaryConcern, previousTherapy,
      stressLevel, sleepQuality, occupation, goalFromTherapy,
      availabilityPreference, communicationStyle
    } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role: 'user',
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userProfile: {
        age,
        gender,
        primaryConcern,
        previousTherapy,
        stressLevel,
        sleepQuality,
        occupation,
        goalFromTherapy,
        availabilityPreference,
        communicationStyle
      }
    });

    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully.' });
  } catch (err) {
    console.error('User Registration Error:', err);
    res.status(500).json({ msg: 'Server error.' });
  }
};

// Register a doctor
const registerDoctor = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password,
      category, gender, experience, price,
      duration, expertise, availability, languages, image
    } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new User({
      role: 'doctor',
      firstName,
      lastName,
      email,
      password: hashedPassword,
      doctorProfile: {
        category,
        gender,
        experience,
        price,
        duration,
        expertise,
        availability,
        languages,
        image
      }
    });

    await newDoctor.save();
    res.status(201).json({ msg: 'Doctor registered successfully.' });
  } catch (err) {
    console.error('Doctor Registration Error:', err);
    res.status(500).json({ msg: 'Server error.' });
  }
};

module.exports = {
  registerUser,
  registerDoctor
};
