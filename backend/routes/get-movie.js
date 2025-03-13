const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const db = require("../db");

// Get movie by id for edit-movie/:id
router.get("/", (req, res) => {
  const sql = `SELECT * FROM movies`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: "Error fetching movie details" });
    }

    if (results.length === 0) {
      return res.status(200).json([]); // Return an empty array if no movies are found
    }

    res.status(200).json(results); // Send the movie data
  });
});

router.get("/get-average-rating/:movie_id", (req, res) => {
  const movie_id = req.params.movie_id;

  const query =
    "SELECT AVG(rating) as average_rating FROM reviews WHERE movie_id = ?";

  db.query(query, [movie_id], (err, results) => {
    if (err) {
      console.error("Error fetching average rating:", err);
      return res.status(500).json({ error: "Failed to fetch average rating" });
    }

    // If no reviews found for the movie
    if (results.length === 0 || results[0].average_rating === null) {
      return res.json({ average_rating: 0 }); // No reviews, set average rating to 0
    }

    const averageRating = results[0].average_rating;

    // Return the average rating
    res.json({ average_rating: averageRating });
  });
});

router.get("/get-review/:movie_id", (req, res) => {
  const movie_id = req.params.movie_id;

  const query = `
    SELECT r.review_text, u.full_name
    FROM reviews r
    JOIN users u ON r.user_id = u.user_id
    WHERE r.movie_id = ?`;

  db.query(query, [movie_id], (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: "Failed to fetch reviews" });
    }
    // console.log(results);
    // Return the average rating
    res.status(200).json(results);
  });
});

module.exports = router;
