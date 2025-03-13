// WatchlistPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Watchlist.module.css"; // Importing CSS module

function Watchlist() {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [toWatchMovies, setToWatchMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/user-login");
          return;
        }

        // Decode the token to check its expiry
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Get current time in seconds

        // If the token is expired, remove it and redirect to login page
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          navigate("/user-login");
          return;
        }

        const response = await axios.get("http://localhost:8081/watchlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { watched, toWatch } = response.data;
        setWatchedMovies(watched);
        setToWatchMovies(toWatch);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  const removeMovie = async (movieId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8081/watchlist/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { status },
      });
      if (status === "watched") {
        setWatchedMovies((prev) =>
          prev.filter((movie) => movie.movie_id !== movieId)
        );
      } else {
        setToWatchMovies((prev) =>
          prev.filter((movie) => movie.movie_id !== movieId)
        );
      }
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };

  if (loading) return <div className={styles.loadingMessage}>Loading...</div>;

  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        {/* Left Half - Watched Movies */}
        <div className={styles.section}>
          <h2>Watched Movies</h2>
          <ul className={styles.movieList}>
            {watchedMovies.map((movie) => (
              <li key={movie.movie_id} className={styles.movieItem}>
                <Link
                  to={`/movie-page/${movie.movie_id}`} // Navigate to movie page
                  className={styles.movieTitle}
                >
                  {movie.title}
                  {/* ({movie.added_at}) */}
                </Link>
                <button onClick={() => removeMovie(movie.movie_id, "watched")}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Half - To-Watch Movies */}
        <div className={styles.section}>
          <h2>To-Watch Movies</h2>
          <ul className={styles.movieList}>
            {toWatchMovies.map((movie) => (
              <li key={movie.movie_id} className={styles.movieItem}>
                <Link
                  to={`/movie-page/${movie.movie_id}`} // Navigate to movie page
                  className={styles.movieTitle}
                >
                  {movie.title}
                  {/*  ({movie.added_at}) */}
                </Link>
                <button onClick={() => removeMovie(movie.movie_id, "to-watch")}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Watchlist;
