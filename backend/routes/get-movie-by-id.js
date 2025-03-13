const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const db = require('../db');

// Get movie by id for edit-movie/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    const sql = `SELECT * FROM movies WHERE movie_id = ?`;
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ message: 'Error fetching movie details' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.status(200).json(results[0]); // Send the movie data
    });
  });

module.exports = router;
