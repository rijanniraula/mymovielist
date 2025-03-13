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

//admin $2a$12$QxXf04jD2R3SpYyBd1RU0esmsKg0LJA76MoLjFBm3/60JOFojNo9.

router.post("/", async (req, res) => {
    const {email, password} = req.body;

    try{

        const sqlquery = `SELECT * FROM users WHERE email = ? AND role = 'user'`;
        db.query(sqlquery , [email], async (err, results) => {
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
                      { user_id: user.user_id, full_name: user.full_name, role: user.role },
                      JWT_SECRET,
                      { expiresIn: '1h' } 
                    );

                    res.status(200).json({ message: "Login successful", token  });
        });

    }
    catch(error){
        console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;