const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expect: Bearer <token>

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // Attach user to request
    next();
  } catch (err) {
    console.error('JWT Error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
