import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import styles from "./EditMovie.module.css";
import Sidebar from "../../../components/AdminPanelSidebar/Sidebar";

function EditMovie() {
  const navigate = useNavigate();

  const genresList = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Adventure",
    "Fantasy",
    "Documentary",
  ];

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    synopsis: "",
    genres: [],
    releaseDate: "",
    poster: null,
    banner: null,
    trailer: "",
    cast: "",
    directors: "",
    producers: "",
    cinematography: "",
    composer: "",
  });

  const [error, setError] = useState("");

  const { id } = useParams(); // Get the movie_id from the URL
  console.log("Movie ID from URL:", id);
  // Fetch movie data by movie_id
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8081/get-movie-by-id/${id}`)
        .then((response) => {
          console.log(response.data);
          setFormData(response.data); // Populate the form fields
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
          setError("Failed to load movie data.");
        });
    } else {
      console.log("No movie ID available.");
    }
  }, [id]); // Re-run the effect when the movie_id changes

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        genres: checked
          ? [...prev.genres, value]
          : prev.genres.filter((genre) => genre !== value),
      }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  //handle movie updagte
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "genres") {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });

    console.log("Form data being sent:", data);

    try {
      const response = await fetch("http://localhost:8081/edit-movie", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Movie Updated successfully!");
        // Redirect to /edit-movie after the alert is closed
        navigate("/edit-movie");
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error Updating movie: ", error);
    }
  };

  // Handle movie deletion
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8081/delete-movie/${id}`)
        .then((response) => {
          alert("Movie deleted successfully!");
          navigate("/edit-movie"); // Redirect to a movie list page after deletion
        })
        .catch((error) => {
          console.error("Error deleting movie:", error);
          alert("Failed to delete movie.");
        });
    }
  };

  return (
    <div className={styles.maincontainer}>
      <Sidebar />
      <div className={styles.main}>
        <h2 className={styles.colorblack}>Edit Movie</h2>
        <div className={styles.addmoviecontainer}>
          <form onSubmit={handleSubmit}>
            <div>
              <div className={styles.colorblack}>Title</div>
              <input type="text" name="id" defaultValue={id} hidden />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div>
              <div className={styles.colorblack}>Synopsis</div>
              <textarea
                name="synopsis"
                value={formData.synopsis}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.checkboxContainer}>
              <div className={styles.colorblack}>Genres</div>
              {genresList.map((genre) => (
                <label key={genre} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value={genre}
                    checked={formData.genres.includes(genre)}
                    onChange={handleChange}
                  />
                  {genre}
                </label>
              ))}
            </div>

            <div className={styles.sameline}>
              <div>
                <div className={styles.colorblack}>Release Date</div>
                <input
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  className={styles.inputsmall}
                />
              </div>
              <div>
                <div className={styles.colorblack}>Poster</div>
                <input
                  type="file"
                  name="poster"
                  onChange={handleChange}
                  className={styles.inputsmall}
                />
              </div>
              {/* <div>
                    <div className={styles.colorblack}>Banner</div>
                    <input
                    type="file"
                    name="banner"
                    onChange={handleChange}
                    className={styles.inputsmall}
                    />
                </div> */}
              <div>
                <div className={styles.colorblack}>Trailer YouTube Link</div>
                <input
                  type="url"
                  name="trailer"
                  value={formData.trailer}
                  onChange={handleChange}
                  className={styles.inputsmall}
                />
              </div>
            </div>

            <div>
              <div className={styles.colorblack}>
                Cast (separate with a comma)
              </div>
              <textarea
                name="cast"
                value={formData.cast}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.sameline}>
              <div>
                <div className={styles.colorblack}>Directors</div>
                <input
                  type="text"
                  name="directors"
                  value={formData.directors}
                  onChange={handleChange}
                  className={styles.inputsmall}
                />
              </div>
              <div>
                <div className={styles.colorblack}>Producers</div>
                <input
                  type="text"
                  name="producers"
                  value={formData.producers}
                  onChange={handleChange}
                  className={styles.inputsmall}
                />
              </div>
              <div>
                <div className={styles.colorblack}>Cinematography</div>
                <input
                  type="text"
                  name="cinematography"
                  value={formData.cinematography}
                  onChange={handleChange}
                  className={styles.inputsmall}
                />
              </div>
              <div>
                <div className={styles.colorblack}>Composer</div>
                <input
                  type="text"
                  name="composer"
                  value={formData.composer}
                  onChange={handleChange}
                  className={styles.inputsmall}
                />
              </div>
            </div>
            <div className={styles.buttoncontainer}>
              <button
                type="button"
                onClick={handleDelete}
                className={styles.deletebutton}
              >
                {" "}
                Delete Movie{" "}
              </button>
              <button type="submit" className={styles.submitbutton}>
                {" "}
                Update Movie{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditMovie;
