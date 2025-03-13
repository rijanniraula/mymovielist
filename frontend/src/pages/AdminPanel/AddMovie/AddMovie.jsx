import React, { useState } from "react";
import Sidebar from "../../../components/AdminPanelSidebar/Sidebar";
import styles from "./AddMovie.module.css";

function AddMovie() {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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

    try {
      const response = await fetch("http://localhost:8081/add-movie", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Movie added successfully!");
        window.location.reload(); // Refresh the page
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error adding movie: ", error);
    }
  };

  return (
    <div className={styles.maincontainer}>
      <Sidebar />
      <div className={styles.main}>
        <h2 className={styles.colorblack}>Add Movie</h2>
        <div className={styles.addmoviecontainer}>
          <form onSubmit={handleSubmit}>
            <div>
              <div className={styles.colorblack}>Title</div>
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
            <div className={styles.submitbuttoncontainer}>
              <button type="submit" className={styles.submitbutton}>
                Add Movie
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
