import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';



function ProtectedRoute({ element }) {
    const token = localStorage.getItem("authToken");

    if (!token) {
        
        return <Navigate to="/admin-login" />;
    }

    try {
        const decoded = jwtDecode(token); 

        
        if (decoded.username === 'admin' && decoded.role === 'admin') {
            return element; // If valid, render the component
        } else {
            return <Navigate to="/admin-login" />; 
        }
    } catch (error) {
        console.error("Invalid token", error);
        return <Navigate to="/admin-login" />;
    }
}

export default ProtectedRoute;
