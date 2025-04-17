import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=39366e740292cdc72bf71cb39823a882`
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <ul className={css.reviewList}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id} className={css.reviewItem}>
              <p className={css.reviewText}>
                <strong>{review.author}</strong>
              </p>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <p>We don`t have any reviews for this movie yet.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
