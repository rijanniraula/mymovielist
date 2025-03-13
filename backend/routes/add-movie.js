const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const db = require('../db');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); //store uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });

  const upload = multer({storage});

  //add movie route
  router.post(
    '/', 
    upload.fields([
      {name: 'poster', maxCount: 1},
      {name: 'banner', maxCount: 1},  
    ]),
    (req, res) => {
        try{
            const { title, synopsis, releaseDate, genres, cast, directors, producers, cinematography, composer, trailer } =
            req.body;

            const posterPath = req.files.poster ? req.files.poster[0].path : null;
            const bannerPath = req.files.banner ? req.files.banner[0].path : null;

            //log received data
            console.log({
                title,
                synopsis,
                releaseDate,
                genres,
                cast,
                directors,
                producers,
                cinematography,
                composer,
                trailer,
                posterPath,
                bannerPath,
            });

      
            const sql = `INSERT INTO movies (title, synopsis, release_date, genres, cast, directors, producers, cinematography, composer, trailer, poster_path, banner_path)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            db.query(sql, [title, synopsis, releaseDate, genres, cast, directors, producers, cinematography, composer, trailer, posterPath, bannerPath], (err, result) => {
                if (err){
                  return res.status(500).json({ message: 'Database error while adding movie' }); 
                }
                res.status(201).json({ message: 'Movie added successfully!' });
            });
            
            
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error while adding movie' });
        }
    }
);

module.exports = router;