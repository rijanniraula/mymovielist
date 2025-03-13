import React, { useState } from "react";
import Styles from "./LandingPage.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import MovieCard from "../../components/MovieCard/MovieCard";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react"; // Import the Swiper component
import "swiper/swiper-bundle.css"; // Import the Swiper CSS

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [recentlyAddedMovies, setRecentlyAddedMovies] = useState([]);

  const [searchTitle, setSearchTitle] = useState(""); // State for search input
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTitle.trim()) return; // Prevent empty search
    navigate(`/browse-movie/${searchTitle}`); // Navigate to the SearchResult page with the search title
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8081/get-movie`);
        if (response.ok) {
          const data = await response.json();

          // Sort movies using Quick Sort
          const sortedMovies = quickSort(data, "release_date");

          const sortedByUploadedAt = quickSort(data, "uploaded_at");

          setMovies(sortedMovies);
          setRecentlyAddedMovies(sortedByUploadedAt);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // sorting
  const quickSort = (arr, key) => {
    if (arr.length <= 1) return arr;

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
      if (new Date(arr[i][key]) > new Date(pivot[key])) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [...quickSort(left, key), pivot, ...quickSort(right, key)];
  };

  return (
    <div className={Styles.supercontainer}>
      <div className={Styles.maincontainer}>
        <NavBar />
        <div className={Styles.sectionContainer}>
          <div className={Styles.heroSection}>
            <h1 className={Styles.heading}>MyMovieList</h1>

            <div className={Styles.heroline}>
              One stop for your Movie Reviews, Rating and Recommendations
            </div>
          </div>

          <div className={Styles.searchBar}>
            <div className={Styles.searchContainer}>
              <input
                type="text"
                className={Styles.search}
                placeholder="Search"
                onChange={(e) => setSearchTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                type="submit"
                onClick={handleSearch}
                className={Styles.searchButton}
                value="🔍"
              >
                🔍
              </button>
            </div>
          </div>
          <NavLink to="/browse-movie">
            <div className={Styles.browse}>
              <button className={Styles.btnBrowse}>Browse Movies</button>
            </div>
          </NavLink>
        </div>
        <div className={Styles.bodysectioncontainer}>
          <div className={Styles.newreleasecontainer}>
            <h2>New Release</h2>
            <Swiper
              spaceBetween={20}
              slidesPerView={4}
              navigation={false}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {movies.slice(0, 10).map((movie) => (
                <SwiperSlide key={movie.movie_id}>
                  <MovieCard
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={Styles.recentcontainer}>
            <h2>Recently Added</h2>
            <Swiper
              spaceBetween={20}
              slidesPerView={4}
              navigation={false}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {recentlyAddedMovies.slice(0, 10).map((movie) => (
                <SwiperSlide key={movie.movie_id}>
                  <MovieCard
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* <div className={Styles.topratedcontainer}>
            <h2>Top Rated</h2>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
