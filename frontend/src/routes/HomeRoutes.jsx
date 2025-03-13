import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLogin from "../pages/UserLogin/UserLogin";
import UserRegistration from "../pages/UserLogin/UserRegistration";
import LandingPage from "../pages/Home/LandingPage";
import MoviePage from "../pages/MoviePage/MoviePage";
import SearchResult from "../pages/SearchResult/SearchResult";
import MovieCard from "../components/MovieCard/MovieCard";
import UserProfile from "../pages/UserProfile/UserProfile";
import Watchlist from "../pages/Watchlist/Watchlist";
import ProtectedRouteUser from "./ProtectedRouteUser";
import Rate from "../pages/Rate/Rate";

function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-register" element={<UserRegistration />} />
      <Route path="/browse-movie/:title" element={<SearchResult />} />
      <Route path="/browse-movie" element={<SearchResult />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/movie-card" element={<MovieCard />} />
      <Route path="/movie-page/:movie_id" element={<MoviePage />} />
      <Route path="/rate/:movie_id" element={<Rate />} />

      <Route element={<ProtectedRouteUser />}>
        <Route path="/user-profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default HomeRoutes;
