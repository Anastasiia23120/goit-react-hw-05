import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import "./App.module.css";

const HomePage = lazy(() => import("../HomePage/HomePage"));
const MoviesPage = lazy(() => import("../MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() => import("../NotFoundPage/NotFoundPage"));

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="/not-found" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
