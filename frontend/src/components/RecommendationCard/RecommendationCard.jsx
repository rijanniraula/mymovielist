import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecommendationCard.module.css";

function RecommendationCard({ poster, title, movie_id }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie-page/${movie_id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img src={poster} alt={title} className={styles.poster} />
      <div className={styles.title}>{title}</div>
    </div>
  );
}

export default RecommendationCard;
