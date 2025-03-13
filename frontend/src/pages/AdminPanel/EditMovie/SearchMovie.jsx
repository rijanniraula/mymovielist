import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from '../../../components/AdminPanelSidebar/Sidebar';
import styles from '../EditMovie/SearchMovie.module.css';



const SearchMovie = () => {
    const [searchTitle, setSearchTitle] = useState(''); // State to store the search query
    const [searchResults, setSearchResults] = useState([]); // State to store the search results
    const [error, setError] = useState(''); // State to store error messages

    // Handle input change for search
    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value);
    };

    // Function to handle movie search
    const searchMovie = () => {
        
        if (searchTitle.trim() === '') {
            setError('Please enter a title to search.');
            return;
        }
        setError(''); // Reset error message before searching

        axios
            .get(`http://localhost:8081/search-movie-title?title=${searchTitle}`)
            .then((response) => {
                setSearchResults(response.data); // Set the search results from the backend
            })
            .catch((error) => {
                console.error(error);
                setError('No movies found with that title.');
                setSearchResults([]); // Reset results on error
            });
    };

    return (
        <div className={styles.bodycontainer}>
            <Sidebar />
            <div className={styles.maincontainer}>
                <h2>Edit Movie</h2>
                <div className={styles.searchandresultcontainer}>
                    {/* Search Section */}
                    <div className={styles.searchcontainer}>
                        <input
                            type="text"
                            placeholder="Enter movie title"
                            value={searchTitle}
                            onChange={handleSearchChange}
                        />
                        <button onClick={searchMovie}>Search</button>
                    </div>

                    {/* Error Message */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {/* Search Results */}
                    <div className={styles.resultcontainer}>
                        <h2>Search Results</h2>

                        {searchResults.length > 0 ? (
                            <table className={styles.resulttable}>
                            <thead>
                                <tr>
                                    <th>Poster</th>
                                    <th>Title</th>
                                    <th>Synopsis</th>
                                    <th>Release Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((movie) => (
                                    <tr key={movie.movie_id}>
                                        <td>
                                            <img 
                                                src={`http://localhost:8081/${movie.poster_path}` || 'https://via.placeholder.com/100'} // Fallback if no poster
                                                alt={`${movie.title} Poster`}
                                                className={styles.thumbnail}
                                            />
                                        {console.log(`${movie.poster_path}}`)}
                                        </td>
                                        <td>{movie.title}</td>
                                        <td>{movie.synopsis}</td>
                                        <td>{movie.release_date}</td>
                                        <td>
                                            <Link to={`/edit-movie/movie_id/${movie.movie_id}`}>Edit Movie</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        ) : (
                        <p>No results to display.</p>
                        )}
                    </div>
                </div>
            
            </div>
        </div>
    );
};

export default SearchMovie;
