import React from "react";
import { useState, useEffect } from "react";
import styles from './Dashboard.module.css';
import Sidebar from "../../../components/AdminPanelSidebar/Sidebar";

function Dashboard() {

    const [totalMovies, setTotalMovies] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch total movies from the backend
        const fetchTotalMovies = async () => {
            try {
                const response = await fetch('http://localhost:8081/total-movies');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setTotalMovies(data.totalMovies); // Update state with the fetched data
            } catch (error) {
                console.error("Error fetching total movies:", error);
                setError("Unable to fetch total movies. Please try again later.");
            }
        };
        
        //Fetch total users from the backend
        const fetchTotalUsers = async () => {
            try {
                const response = await fetch('http://localhost:8081/total-users');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setTotalUsers(data.totalUsers); // Update state with the fetched data
            } catch (error) {
                console.error("Error fetching total movies:", error);
                setError("Unable to fetch total movies. Please try again later.");
            }
        };
        
        fetchTotalUsers();
        fetchTotalMovies();
    }, []);

    return(
        <div className={styles.dashboardmain}>
           <Sidebar/>
           
            <div className={styles.dashboardcontainer}>
                <h2>Dashboard</h2>
                <div className={styles.totalcountcontainer}>
                    <div className={styles.totalmoviescontainer}>
                        <h4>Total Movies</h4>
                        {totalMovies}
                    </div>
                    <div className={styles.totaluserscontainer}>
                        <h4>Total Users</h4>
                        {totalUsers}
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Dashboard;