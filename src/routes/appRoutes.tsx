import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MoviesList from "../pages/moviesList";
import EmptyList from "../pages/emptyList";
import CreateMovies from "../pages/CreateMovie";

export const AppRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="" element={<Navigate to={`/app/movies`} replace />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/emptyList" element={<EmptyList />} />
        <Route path="/create" element={<CreateMovies />} />
        <Route path="/edit" element={<CreateMovies />} />
      </Routes>
    </React.Fragment>
  );
};
