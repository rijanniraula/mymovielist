const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const db = require('../db');

router.delete('/:id', (req, res) => {
    const movie_id = req.params.id;
    
    
    try {
       const sql = `DELETE FROM movies WHERE movie_id = ?`;
        db.query(
            sql,
            [movie_id],
            (err, result) => {
                if (err) {
                    console.error('Database Error:', err);
                    return res.status(500).json({ message: 'Database error while deleting movie' });
                }

                res.status(200).json({ message: 'Movie Deleted successfully!' });
                
            }
        );
    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).json({ message: 'Error while deleting movie' });
    }

  });
  

module.exports = router;
