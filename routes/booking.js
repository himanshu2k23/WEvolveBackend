const express = require('express');
const router = express.Router();
const { createBooking, getBookings, cancelBooking } = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth, createBooking);    
router.get('/show', auth, getBookings);   
router.delete('/cancel/:id', auth, cancelBooking); 


module.exports = router;
