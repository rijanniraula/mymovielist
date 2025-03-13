import React, { useState, useEffect } from "react";
import styles from "./MoviePage.module.css";
import RecommendationCard from "../../components/RecommendationCard/RecommendationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavBar from "../../components/NavBar/NavBar";

function MoviePage() {
  const { movie_id } = useParams(); // Get movie_id from URL
  const [movie, setMovie] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [review, setReview] = useState([]);
  const [recommendation, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRateClick = () => {
    navigate(`/rate/${movie_id}`);
  };

  const addToWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user-login"); // Redirect to login if no token
      return;
    }

    if (
      window.confirm(
        "Are you sure you want to add this movie to your wishlist?"
      )
    ) {
      try {
        const decoded = jwtDecode(token);
        const user_id = decoded.user_id;

        const response = await fetch(
          "http://localhost:8081/submit-review/add-to-wishlist",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              movie_id: movie_id,
              user_id: user_id,
              status: "to-watch",
            }),
          }
        );

        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Failed to add movie to wishlist: ${errorDetails}`);
        }

        alert("Movie added to wishlist!");
      } catch (error) {
        console.error("Error adding to watchlist:", error);
        alert("Error adding movie to wishlist");
      }
    }
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/get-movie-by-id/${movie_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const data = await response.json();
        setMovie(data);

        const ratingResponse = await fetch(
          `http://localhost:8081/get-movie/get-average-rating/${movie_id}`
        );
        const ratingData = await ratingResponse.json();
        setAverageRating(Number(ratingData.average_rating) || 0);

        const reviewResponse = await fetch(
          `http://localhost:8081/get-movie/get-review/${movie_id}`
        );
        const reviewData = await reviewResponse.json();
        // console.log(reviewData);
        setReview(reviewData);

        setLoading(false);

        const recommendations = await fetch(
          `http://localhost:8081/recommend/${movie_id}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setRecommendations(data.recommendations || []);
          });
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movie_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>No movie data available</div>;
  }

  // Function to extract YouTube video id from yt
  const getYouTubeVideoId = (url) => {
    const youtubePattern =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+|(?:v|e(?:mbed)?)\/|.*[\?&]v=)|youtu\.be\/)([\w\-]+)/;
    const match = url.match(youtubePattern);
    if (match) {
      return match[1];
    }
    return null;
  };

  const videoId = movie.trailer ? getYouTubeVideoId(movie.trailer) : null;

  // Function to format release date to "YYYY-MM-DD"
  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`; // Return the formatted date
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.maincontainer}>
        <div className={styles.leftcontainer}>
          <div className={styles.titleanddate}>
            <h1 className={styles.title}>{movie.title}</h1>
            <span>{formatReleaseDate(movie.release_date)}</span>
          </div>
          <div className={styles.infoRow}></div>
          <div className={styles.topSection}>
            <div className={styles.leftSection}>
              <img
                src={
                  `http://localhost:8081/${movie.poster_path}` ||
                  "https://via.placeholder.com/100"
                }
                alt={movie.title}
                className={styles.poster}
              />
            </div>
            <div className={styles.trailerContainer}>
              {movie.trailer && (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>

          <div className={styles.detailsContainer}>
            <div className={styles.rategenre}>
              <div className={styles.ratingRow}>
                <FontAwesomeIcon icon={faStar} className={styles.icon} />{" "}
                {averageRating.toFixed(1)} / 10
                <button className={styles.rateButton} onClick={handleRateClick}>
                  <FontAwesomeIcon icon={faStar} className={styles.icon} /> Rate
                  / Review
                </button>
                <button
                  className={styles.watchlistButton}
                  onClick={addToWishlist}
                >
                  <FontAwesomeIcon icon={faBookmark} /> Add to To-Watch
                </button>
              </div>
              <div className={styles.tags}>
                {movie.genres &&
                  JSON.parse(movie.genres).map((genre, index) => (
                    <span key={index}>{genre}</span>
                  ))}
              </div>
            </div>
          </div>

          <div className={styles.filmmain}>
            <div className={styles.filmdes}>
              <div className={styles.synopsis}>
                <div className={styles.synopsiss}>Synopsis</div>
                <div>{movie.synopsis}</div>
              </div>

              <div className={styles.castCrew}>
                <div className={styles.synopsiss}>Cast</div>
                <div>
                  {movie.cast
                    ? movie.cast.split(",").map((castMember, index) => (
                        <span key={index} className={styles.castItem}>
                          {castMember.trim()}
                          {index !== movie.cast.split(",").length - 1 && ", "}
                        </span>
                      ))
                    : "No cast information available"}
                </div>
                <div className={styles.synopsiss}>Director</div>
                <div>
                  {movie.directors
                    ? movie.directors.split(",").map((castMember, index) => (
                        <span key={index} className={styles.castItem}>
                          {castMember.trim()}
                          {index !== movie.cast.split(",").length - 1 && ", "}
                        </span>
                      ))
                    : "No cast information available"}
                </div>
                <div className={styles.synopsiss}>Producer</div>
                <div>
                  {movie.producers
                    ? movie.producers.split(",").map((castMember, index) => (
                        <span key={index} className={styles.castItem}>
                          {castMember.trim()}
                          {index !== movie.cast.split(", ").length - 1 && ", "}
                        </span>
                      ))
                    : "No cast information available"}
                </div>
                <div className={styles.synopsiss}>Cinematography</div>
                <div>
                  {movie.cinematography
                    ? movie.cinematography
                        .split(",")
                        .map((castMember, index) => (
                          <span key={index} className={styles.castItem}>
                            {castMember.trim()}
                            {index !== movie.cast.split(",").length - 1 && ", "}
                          </span>
                        ))
                    : "No cast information available"}
                </div>
                <div className={styles.synopsiss}>Composer</div>
                <div>
                  {movie.composer
                    ? movie.composer.split(",").map((castMember, index) => (
                        <span key={index} className={styles.castItem}>
                          {castMember.trim()}
                          {index !== movie.cast.split(",").length - 1 && ", "}
                        </span>
                      ))
                    : "No cast information available"}
                </div>
              </div>
              <div className={styles.reviewcontainer}>
                <div className={styles.reviews}>Reviews</div>
                <div className={styles.reviewcard}>
                  {review.length > 0
                    ? review.map((item, index) => (
                        <div key={index} className={styles.reviewitem}>
                          <strong style={{ paddingRight: "1rem" }}>
                            {item.full_name}
                          </strong>

                          <div>{item.review_text}</div>
                          {index !== review.length - 1}
                        </div>
                      ))
                    : "No Reviews information available"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightcontainer}>
          <div>Recommended for you</div>
          <div className={styles.recommendationcards}>
            {recommendation.map((rec) => (
              <RecommendationCard
                key={rec.movie_id}
                movie_id={rec.movie_id}
                title={rec.title}
                poster={
                  rec.poster_path
                    ? `http://localhost:8081/${rec.poster_path.replace(
                        /\\/g,
                        "/"
                      )}`
                    : "https://via.placeholder.com/150x200?text=No+Image"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
