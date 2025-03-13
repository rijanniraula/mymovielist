const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const db = require('../db');


// Endpoint to get all users
router.get('/get-user-list', (req, res) => {
    const sqlQuery = `SELECT * FROM users WHERE role = 'user'`; // SQL query to fetch all data from users table

    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.error('Error fetching user list:', err);
            return res.status(500).send({ message: 'Error fetching user list' });
        }

        res.status(200).send(result); // Send the list of users as the response
    });
});

//endpoint to delete user
router.delete("/delete-user/:user_id", (req, res) => {
    const userId = parseInt(req.params.user_id); 
    
    const sqlquery = `DELETE FROM users WHERE user_id = ?`; 
    
    db.query(sqlquery, [userId], (err, result) => {
        if (err) {
            console.error("Error deleting user: ", err);
            return res.status(500).send({ message: "Error deleting user" }); 
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "User not found" }); 
        }

        res.status(200).send({ message: "User deleted successfully" }); 
    });
});

module.exports = router;