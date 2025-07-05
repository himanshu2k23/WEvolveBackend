const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const registerRoutes = require('./routes/register');
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctor');
const bookingRoutes = require('./routes/booking')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/register', registerRoutes);

app.use('/api', authRoutes);

app.use('/api/doctors', doctorRoutes);

app.use('/api/booking', bookingRoutes);



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
