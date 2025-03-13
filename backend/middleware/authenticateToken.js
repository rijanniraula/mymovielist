const jwt = require('jsonwebtoken');

const JWT_SECRET = 'admin';

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Token expired or invalid' });
      req.user = decoded; // Pass user details to the next function
      next();
    });
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;
