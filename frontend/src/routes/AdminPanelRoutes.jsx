import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/AdminPanelSidebar/Sidebar";
import Dashboard from "../pages/AdminPanel/Dashboard/Dashboard";
import MovieDetail from "../pages/AdminPanel/MovieDetail";
import AddMovie from "../pages/AdminPanel/AddMovie/AddMovie";
import EditMovie from "../pages/AdminPanel/EditMovie/EditMovie";
import SearchMovie from "../pages/AdminPanel/EditMovie/SearchMovie";
import Genres from "../pages/AdminPanel/Genres";
import CastAndCrew from "../pages/AdminPanel/CastAndCrew";
import ManageUsers from "../pages/AdminPanel/ManageUsers/ManageUsers";
import AdminSettings from "../pages/AdminPanel/AdminSettings";
import Logout from "../pages/AdminPanel/Logout";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import AdminLogin from "../pages/AdminPanel/AdminLogin/AdminLogin";
import ProtectedRoute from "../routes/ProtectedRoutes"; 

function AdminPanelRoutes() {
    return (
        <Routes>
            {/* Public route */}
            <Route path='/admin-login' element={<AdminLogin />} />

            {/* Protected routes */}
            <Route path='/admin' element={<ProtectedRoute element={<AdminPanel />} />} />
            <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path='/add-movie' element={<ProtectedRoute element={<AddMovie />} />} />
            <Route path="/edit-movie/movie_id/:id" element={<ProtectedRoute element={<EditMovie />} />} />
            <Route path='/edit-movie' element={<ProtectedRoute element={<SearchMovie />} />} />
            <Route path='/genres' element={<ProtectedRoute element={<Genres />} />} />
            <Route path='/cast-and-crew' element={<ProtectedRoute element={<CastAndCrew />} />} />
            <Route path='/manage-users' element={<ProtectedRoute element={<ManageUsers />} />} />
            <Route path='/movie-detail' element={<ProtectedRoute element={<MovieDetail />} />} />
            <Route path='/admin-settings' element={<ProtectedRoute element={<AdminSettings />} />} />
            <Route path='/logout' element={<ProtectedRoute element={<Logout />} />} />
        </Routes>
    );
}

export default AdminPanelRoutes;
