const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const db = require('../db');

// Storage configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // store uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });




// Update movie details
router.post(
    '/',
    upload.fields([
        { name: 'poster', maxCount: 1 },
        { name: 'banner', maxCount: 1 },
    ]),
    (req, res) => {

        console.log(req.body);  // Check form fields
        console.log(req.files);  // Check files uploaded

        try {
            const { movie_id, title, synopsis, releaseDate, genres, cast, directors,producers, cinematography, composer, trailer, } = req.body;
            
            const posterPath = req.files.poster ? req.files.poster[0].path : null;
            const bannerPath = req.files.banner ? req.files.banner[0].path : null;

            console.log("Poster Path:", posterPath);
            console.log("Banner Path:", bannerPath);
            console.log("var id = ", movie_id);


            const sql = `UPDATE movies SET title = ?, synopsis = ?, release_date = ?, genres = ?, cast = ?, directors = ?, producers = ?, cinematography = ?, composer = ?, trailer = ?, 
                         poster_path = ?, banner_path = ?
                         WHERE movie_id = ?`;
            db.query(
                sql,
                [title, synopsis, releaseDate, genres, cast, directors, producers, cinematography, composer, trailer, posterPath , bannerPath , movie_id],
                (err, result) => {
                    if (err) {
                        console.error('Database Error:', err);
                        return res.status(500).json({ message: 'Database error while updating movie' });
                    }

                    res.status(200).json({ message: 'Movie updated successfully!' });
                    
                }
            );
        } catch (err) {
            console.error('Server Error:', err);
            res.status(500).json({ message: 'Error while updating movie' });
        }
    }
);

module.exports = router;
