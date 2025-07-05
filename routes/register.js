const express = require('express');
const {
  registerUser,
  registerDoctor
} = require('../controllers/registerController');

const router = express.Router();

router.post('/user', registerUser);
router.post('/doctor', registerDoctor);

module.exports = router;
