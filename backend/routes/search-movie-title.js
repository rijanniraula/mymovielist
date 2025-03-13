const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const db = require("../db");

// Search for a movie by title
router.get("/", (req, res) => {
  const { title, rating } = req.query;
  //   console.log(rating);
  let sql = "SELECT * FROM movies WHERE 1=1";
  const params = [];

  if (title) {
    sql += " AND title LIKE ?";
    params.push(`%${title}%`);
  }

  if (rating) {
    sql += " AND rating = ?";
    params.push(rating);
  }
  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res
        .status(500)
        .json({ message: "Database error while searching for movie" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No movie found with the given title" });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
