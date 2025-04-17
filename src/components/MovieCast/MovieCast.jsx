import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=39366e740292cdc72bf71cb39823a882`
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };

    if (movieId) {
      fetchMovieCast();
    }
  }, [movieId]);

  if (!cast.length) {
    return <p>No cast information available.</p>;
  }

  return (
    <div>
      <ul className={css.castList}>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className={css.actorImage}
              />
            )}
            <div className={css.actorInfo}>
              <p>
                <strong>{actor.name}</strong>
              </p>
              <p>{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
