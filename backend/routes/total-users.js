const express = require("express");
const mysql = require("mysql");
const router = express.Router();

const db = require('../db');

//parse JSON bodies
router.use(express.json()); 

router.get('/', async (req, res) => {
    const sqlquery =  `SELECT COUNT(*) AS totalUsers FROM users`;
    db.query(sqlquery, (err, result) => {
        if(err){
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log(result[0].totalUsers);
        return res.json({ totalUsers: result[0].totalUsers });
    });
});

module.exports = router;