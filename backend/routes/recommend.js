const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const natural = require("natural");
const { TfIdf } = natural;
const cosineSimilarity = require("cosine-similarity");

router.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "mymovielist",
});

async function getMovieRecommendations(movieId) {
  const [movies] = await db.query(
    "SELECT  movie_id, title, poster_path, CONCAT(genres,' ', cast, ' ', directors) AS tags from movies"
  );

  const targetMovie = movies.find((movie) => movie.movie_id === movieId);
  if (!targetMovie) {
    throw new Error("No movies");
  }
  //vectorizing
  const tfidf = new TfIdf();
  movies.forEach((movie) => tfidf.addDocument(movie.tags.toLowerCase()));

  const targetVector = [];
  tfidf.tfidfs(targetMovie.tags.toLowerCase(), (i, measure) => {
    targetVector.push(measure);
  });

  const similarities = movies
    .map((movie, index) => {
      if (movie.movie_id === movieId) return null;

      const movieVector = [];
      tfidf.tfidfs(movie.tags.toLowerCase(), (i, measure) => {
        movieVector.push(measure);
      });

      const similarity = cosineSimilarity(targetVector, movieVector);
      return {
        movie_id: movie.movie_id,
        title: movie.title,
        poster_path: movie.poster_path,
        similarity,
      };
    })
    .filter((item) => item != null)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 10);

  return similarities;
}

router.get("/:movie_id", async (req, res) => {
  const movieId = parseInt(req.params.movie_id);
  try {
    const recommendations = await getMovieRecommendations(movieId);
    res.json({
      movieId,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
