// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedDoctors = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB');

    const commonPassword = "password";

    const doctors = [
      {
        role: 'doctor',
        firstName: 'Rohan',
        lastName: 'Deshmukh',
        email: 'rohan123@example.com',
        password: commonPassword,
        doctorProfile: {
          category: 'therapist',
          gender: 'male',
          experience: 8,
          price: 1100,
          duration: '50 mins',
          expertise: ['Anger management', 'Relationship skills'],
          languages: ['English', 'Hindi', 'Marathi'],
          image: 'malePfp.jpg'
        }
      },
      {
        role: 'doctor',
        firstName: 'Neha',
        lastName: 'Sharma',
        email: 'neha@example.com',
        password: commonPassword,
        doctorProfile: {
          category: 'psychologist',
          gender: 'female',
          experience: 5,
          price: 900,
          duration: '45 mins',
          expertise: ['Anxiety', 'Self-esteem', 'Depression'],
          languages: ['English', 'Hindi'],
          image: 'femalePfp.jpg'
        }
      },
      {
        role: 'doctor',
        firstName: 'Aarav',
        lastName: 'Patel',
        email: 'aarav@example.com',
        password: commonPassword,
        doctorProfile: {
          category: 'psychiatrist',
          gender: 'male',
          experience: 10,
          price: 1300,
          duration: '60 mins',
          expertise: ['Bipolar Disorder', 'Addiction', 'PTSD'],
          languages: ['English', 'Gujarati'],
          image: 'malePfp.jpg'
        }
      },
      {
        role: 'doctor',
        firstName: 'Simran',
        lastName: 'Kapoor',
        email: 'simran@example.com',
        password: commonPassword,
        doctorProfile: {
          category: 'therapist',
          gender: 'female',
          experience: 7,
          price: 1000,
          duration: '55 mins',
          expertise: ['Stress', 'Self-harm', 'Mindfulness & Meditation'],
          languages: ['English', 'Hindi'],
          image: 'femalePfp.jpg'
        }
      },
      {
        role: 'doctor',
        firstName: 'Kabir',
        lastName: 'Verma',
        email: 'kabir@example.com',
        password: commonPassword,
        doctorProfile: {
          category: 'psychologist',
          gender: 'male',
          experience: 4,
          price: 850,
          duration: '40 mins',
          expertise: ['Academic Pressure', 'Social Anxiety'],
          languages: ['English'],
          image: 'malePfp.jpg'
        }
      },
      {
        role: 'doctor',
        firstName: 'Ishita',
        lastName: 'Mehra',
        email: 'ishita@example.com',
        password: commonPassword,
        doctorProfile: {
          category: 'therapist',
          gender: 'female',
          experience: 6,
          price: 1050,
          duration: '50 mins',
          expertise: ['Sleep issues', 'Parenting Challenges'],
          languages: ['English', 'Hindi', 'Marathi'],
          image: 'femalePfp.jpg'
        }
      },
      {
        role: 'doctor',
        firstName: 'Ravi',
        lastName: 'Menon',
        email: 'ravi@example.com',
        password: commonPassword,
        doctorProfile: {
          category: 'psychiatrist',
          gender: 'male',
          experience: 12,
          price: 1400,
          duration: '60 mins',
          expertise: ['Trauma Recovery', 'Grief & Loss'],
          languages: ['English', 'Tamil', 'Hindi'],
          image: 'malePfp.jpg'
        }
      }
    ];

    await User.insertMany(doctors);
    console.log('✅ 7 doctors seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding doctors:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

seedDoctors();
