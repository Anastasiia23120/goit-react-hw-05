import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const [query, setQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        setLoading(true);
        setError("");
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=39366e740292cdc72bf71cb39823a882`
          );
          setMovies(response.data.results);
        } catch {
          setError("Error fetching movies. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (query !== queryParam) {
      setSearchParams({ query });
    }
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSearch} className={css.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies"
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
