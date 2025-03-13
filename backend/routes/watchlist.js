// routes/watchlist.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // Your current mysql2 setup
const authenticateToken = require("../middleware/authenticateToken"); // Import the middleware

// Get user's watchlist
router.get("/", authenticateToken, (req, res) => {
  const userId = req.user?.user_id;
  // console.log(userId);

  db.query(
    "SELECT w.movie_id, m.title, w.status, w.added_at FROM watchlist w JOIN movies m ON w.movie_id = m.movie_id WHERE w.user_id = ?",
    [userId],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching watchlist" });
      }
      const watched = rows.filter((row) => row.status === "watched");

      const toWatch = rows.filter((row) => row.status === "to-watch");

      res.json({ watched, toWatch });
    }
  );
});

// Delete movie from watchlist
router.delete("/:movieId", authenticateToken, (req, res) => {
  const userId = req.user?.user_id; // Use the user ID from the token payload
  const { movieId } = req.params;
  const { status } = req.body;

  db.query(
    "DELETE FROM watchlist WHERE user_id = ? AND movie_id = ? AND status = ?",
    [userId, movieId, status],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error removing movie" });
      }
      res.json({ message: "Movie removed successfully" });
    }
  );
});

module.exports = router;
