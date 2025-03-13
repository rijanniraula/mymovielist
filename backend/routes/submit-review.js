const express = require("express");
const router = express.Router();
const db = require("../db"); // MySQL connection
const jwt = require("jsonwebtoken"); // Import jwt for token verification

router.post("/", (req, res) => {
  const { movie_id, user_id, rating, review_text } = req.body;

  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the JWT token with the correct secret
    const decoded = jwt.verify(token, "admin");
    const { user_id: decodedUserId } = decoded;

    // Check if the decoded user_id matches the one in the request body
    if (decodedUserId !== user_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Check if the user has already reviewed the movie
    const checkQuery =
      "SELECT * FROM reviews WHERE user_id = ? AND movie_id = ?";
    db.query(checkQuery, [user_id, movie_id], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (Array.isArray(result) && result.length > 0) {
        // If a review exists, update the review
        const updateQuery =
          "UPDATE reviews SET rating = ?, review_text = ?, reviewed_at = NOW() WHERE user_id = ? AND movie_id = ?";
        db.query(
          updateQuery,
          [rating, review_text, user_id, movie_id],
          (err, updateResult) => {
            if (err) {
              console.error("Database error while updating review:", err);
              return res.status(500).json({
                message: "Database error while updating review",
                error: err,
              });
            }

            // Update the watchlist status to 'watched'
            const upsertWatchlistQuery = `INSERT INTO watchlist (user_id, movie_id, status, added_at)
                                      VALUES (?, ?, 'watched', NOW())
                                      ON DUPLICATE KEY UPDATE 
                                      status = 'watched', added_at = NOW();`;
            db.query(
              upsertWatchlistQuery,
              [user_id, movie_id],
              (err, result) => {
                if (err) {
                  console.error("Database error while updating watchlist", err);
                  return res.status(500).json({
                    message: "Database error while updating watchlist",
                    error: err,
                  });
                }

                res.status(200).json({
                  message: "Review and watchlist updated successfully",
                });
              }
            );
          }
        );
      } else {
        // If no review exists, insert a new review
        const query =
          "INSERT INTO reviews (user_id, movie_id, rating, review_text, reviewed_at) VALUES (?, ?, ?, ?, NOW())";
        db.query(
          query,
          [user_id, movie_id, rating, review_text],
          (err, result) => {
            if (err) {
              console.error("Database error:", err);
              return res
                .status(500)
                .json({ message: "Database error", error: err });
            }

            // Add or update the watchlist status to 'watched'
            const upsertWatchlistQuery = `INSERT INTO watchlist (user_id, movie_id, status, added_at)
                                      VALUES (?, ?, 'watched', NOW())
                                      ON DUPLICATE KEY UPDATE 
                                      status = 'watched', added_at = NOW();`;
            db.query(
              upsertWatchlistQuery,
              [user_id, movie_id],
              (err, result) => {
                if (err) {
                  console.error("Database error while updating watchlist", err);
                  return res.status(500).json({
                    message: "Database error while updating watchlist",
                    error: err,
                  });
                }

                res.status(201).json({
                  message: "Review added and watchlist updated successfully",
                });
              }
            );
          }
        );
      }
    });
  } catch (error) {
    console.error("JWT error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

router.post("/add-to-wishlist", (req, res) => {
  const { movie_id, user_id, status } = req.body;

  // Check if the user is authorized
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "admin");
    const { user_id: decodedUserId } = decoded;

    if (decodedUserId !== user_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Insert movie into the watchlist with status 'wishlist'
    const query = `
        INSERT INTO watchlist (user_id, movie_id, status, added_at)
        VALUES (?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE status = ?, added_at = NOW();
      `;
    db.query(query, [user_id, movie_id, status, status], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          message: "Database error while adding to watchlist",
          error: err,
        });
      }

      res.status(201).json({ message: "Movie added to wishlist" });
    });
  } catch (error) {
    console.error("JWT error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
