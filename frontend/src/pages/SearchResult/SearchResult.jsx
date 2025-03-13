import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "./SearchResult.module.css";
import NavBar from "../../components/NavBar/NavBar";
import MovieCard from "../../components/MovieCard/MovieCard";
import Browse from "../../components/Browse/Browse";

function SearchResult() {
  const { title } = useParams(); // Capture the title from the URL
  const [searchParams] = useSearchParams(); // Get the search params from the URL
  const rating = searchParams.get("rating"); // Get rating from the URL
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      let fetchUrl = "http://localhost:8081/search-movie-title?";

      if (title) {
        fetchUrl += `title=${title}`;
      }

      if (rating) {
        if (fetchUrl.includes("title=")) {
          fetchUrl += `&rating=${rating}`;
        } else {
          fetchUrl += `rating=${rating}`;
        }
      }
      try {
        const response = await fetch(fetchUrl);
        if (response.ok) {
          const data = await response.json();
          setMovies(data); // Set the movies data
        } else {
          const error = await response.json();
          console.error(error.message || "No movies found");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        alert("Something went wrong. Please try again.");
      }
    };

    fetchMovies();
  }, [title, rating]);

  return (
    <div className={styles.maincontainer}>
      <NavBar />
      <Browse />
      <div className={styles.searchresultcontainer}>
        <div className={styles.moviecardscontainer}>
          <h3 className={styles.heading}>Search Results for: {title}</h3>
          <div className={styles.resultsContainer}>
            {movies.map((movie) => (
              <MovieCard
                key={movie.movie_id}
                movie_id={movie.movie_id}
                poster={
                  movie.poster_path
                    ? `http://localhost:8081/${movie.poster_path.replace(
                        /\\/g,
                        "/"
                      )}`
                    : "https://via.placeholder.com/150x200?text=No+Image"
                }
                title={movie.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
