const express = require('express');
const router = express.Router();
const db = require('../db'); // MySQL connection
const authenticateToken = require('../middleware/authenticateToken'); // JWT Middleware 


// Route to fetch user data by user_id
router.get('/', authenticateToken, (req, res) => {
    console.log("User ID from token:", req.user.user_id); // Log the decoded user_id
  
    const user_id = req.user.user_id;
    const query = 'SELECT full_name, email, role FROM users WHERE user_id = ?';
  
    db.query(query, [user_id], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = results[0];
      res.status(200).json(user);
    });
  });
  

module.exports = router;
