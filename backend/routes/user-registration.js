const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt"); 
const saltRounds = 10; //for becrypt hashinh rounds
const jwt = require("jsonwebtoken");
const router = express.Router();

const db = require('../db');

//parse JSON bodies
router.use(express.json()); 

router.post('/', async (req, res) => {
    const {full_name, email, password} = req.body;

    //check for existing user
    const checkExistingUser = `SELECT * FROM users WHERE email = ?`;
    db.query(checkExistingUser, [email], async (err, result) => {
        if(err){
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        //user xaina vane
        if(result.length===0){
            bcrypt.hash(password , saltRounds, (err, hash_password)=>{
                if (err) {
                    console.error('Error hashing password:', err);
                    return;
                  }
                  console.log('Hashed password:', hash_password);

                  //inserting user into the user table
                  const sqlquery = `INSERT INTO users (password, email, full_name, role) VALUES (?, ?, ?, 'user')`;
        
                    db.query(sqlquery, [hash_password, email, full_name], async (err, results) => {
                        if(err){
                            console.error("Database error:", err);
                            return res.status(500).json({ error: "Internal server error" });
                        }
                
                         //success response after insertion
                        return res.status(201).json({ message: "User successfully registered!" });

                    });
            });
        
            
        }
        else{
            return res.json({message: "User already exists!"});
        }
    });


    
});

module.exports = router;