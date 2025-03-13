const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const router = express.Router();


const db = require('../db');

//parse JSON bodies
router.use(express.json()); 

// Secret key for JWT signing
const JWT_SECRET = 'admin';

// Handle admin login
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query to check if user exists and has admin role
    const query = `SELECT * FROM users WHERE username = ? AND role = 'admin'`;
    
    db.query(query, [username], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        // No user found or not an admin
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const user = results[0];

      // Compare password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Generate JWT token with username and role
      const token = jwt.sign(
        { username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
      );
    
      // Successful login
      res.status(200).json({ message: "Login successful", token  });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
