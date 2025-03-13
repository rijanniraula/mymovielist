import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Browse.module.css";

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

const starRatings = Array.from({ length: 10 }, (_, i) => i + 1);

export default function BrowsePage() {
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedRating, setSelectedRating] = useState("All");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value); // Update the rating filter
  };

  const handleSearch = () => {
    if (!searchTitle.trim() && selectedRating === "All") return; // Prevent empty search

    let searchQuery = `/browse-movie/${searchTitle}`;
    if (selectedRating !== "All") {
      searchQuery += `?rating=${selectedRating}`;
    }
    navigate(searchQuery);
  };

  return (
    <div className={Style.browsePageContainer}>
      {/* Search Section */}
      <div className={Style.filterContainer}>
        <div className={Style.searchBar}>
          <input
            type="text"
            placeholder="Search Term..."
            className={Style.searchInput}
            value={searchTitle}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className={Style.searchButton} onClick={handleSearch}>
            🔍
          </button>
        </div>

        {/* Filters Row */}
        <div className={Style.filtersRow}>
          {/* Genre Dropdown */}
          {/* <div className={Style.filterItem}> */}
          {/* Genre selection code can go here */}
          {/* </div> */}
          {/* Rating Dropdown */}
          <div className={Style.filterItem}>
            <div>
              Rating:
              <div>
                <select
                  className={Style.smallDropdown}
                  value={selectedRating}
                  onChange={handleRatingChange}
                >
                  <option value="All">All</option>
                  {starRatings.map((star) => (
                    <option key={star} value={star}>
                      {star}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
