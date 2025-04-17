import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  useParams,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  const locationRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=39366e740292cdc72bf71cb39823a882`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const goBackLocation = locationRef.current;

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <button
        className={css.goBackButton}
        onClick={() => navigate(goBackLocation)}
      >
        Go Back
      </button>

      <div className={css.container}>
        <div className={css.imageContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        <div className={css.movieInfo}>
          <h1>{movie.title}</h1>

          <div>
            <p className={css.details}>
              <strong>User Score:</strong> {movie.vote_average * 10}%
            </p>
            <p className={css.details}>
              <strong>Overview:</strong> {movie.overview}
            </p>
            <p className={css.details}>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      </div>

      <p className={css.addInfo}>Additional information</p>
      <div className={css.links}>
        <NavLink
          to={`/movies/${movieId}/cast`}
          className={({ isActive }) =>
            isActive ? css.activeLink : css.inactiveLink
          }
        >
          Cast
        </NavLink>
        <NavLink
          to={`/movies/${movieId}/reviews`}
          className={({ isActive }) =>
            isActive ? css.activeLink : css.inactiveLink
          }
        >
          Reviews
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
