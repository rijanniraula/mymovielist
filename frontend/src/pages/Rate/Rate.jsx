import React, { useState } from 'react';
import { useEffect } from 'react';
import styles from './Rate.module.css';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

// Assuming your backend expects the data in this format
const starRatings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Rate() {
    const { movie_id } = useParams(); // Get movie_id from URL
    const [review, setReview] = useState('');
    const [rating, setRating] = useState('');
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true); // For loading state
    const [isSubmitting, setIsSubmitting] = useState(false); 
  
 



   // Fetch movie data when movie_id changes
   useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/get-movie-by-id/${movie_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        const data = await response.json();
        setMovie(data); // Store movie data
      } catch (error) {
        alert('Error fetching movie data: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchMovieData();
  }, [movie_id]);


  // Handle Submit
  const handleSubmit = async () => {
    if (rating) {
      setIsSubmitting(true); // Disable the button while submitting
      try {
        const token = localStorage.getItem('token'); // Get JWT token from localStorage
        const user_id = token ? JSON.parse(atob(token.split('.')[1]))?.user_id : null; // Decode token to get user_id

        const response = await fetch('http://localhost:8081/submit-review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            movie_id: movie_id,
            user_id: user_id,
            rating: rating,
            review_text: review,
          }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to submit review');
        }

        alert('Thank you for your feedback!');
      } catch (error) {
        alert('Error: ' + error.message);
        console.error('Review submission error:', error);
      } finally {
        setIsSubmitting(false); // Re-enable the button after submission
      }
    } else {
      alert('Please provide a rating before submitting.');
    }
  };

  return (
    <div className={styles.maincontainer}>
        <NavBar/>
        <div className={styles.page}>        
        <div className={styles.container}>
          <h2 className={styles.title}>Rate this Movie</h2>

            {/* Movie Poster Section */}
          {movie && movie.poster_path && (
            <div className={styles.posterSection}>
              <img
                src={`http://localhost:8081/${movie.poster_path}`} // Display the movie poster
                alt={movie.title}
                className={styles.poster}
              />
            </div>
          )} 

          <div className={styles.content}>
            <div className={styles.reviewSection}>
              {/* Rating Dropdown */}
              <div className={styles.rate}>
                <label className={styles.label}>Rate:</label>
                <select
                  className={styles.smallDropdown}
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select</option>
                  {starRatings.map((star) => (
                    <option key={star} value={star}>
                      {star} ★
                    </option>
                  ))}
                </select>
              </div>
  
              {/* Review Box */}
              <div className={styles.reviewBox}>
                <h3 className={styles.reviewTitle}>Give Review</h3>
                <textarea
                  className={styles.textArea}
                  placeholder="Write your review here..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
              </div>
  
              {/* Submit Button */}
              <button className={styles.submitButton} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
