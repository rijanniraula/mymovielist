import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";
import { jwtDecode } from "jwt-decode";
import NavBar from "../../components/NavBar/NavBar";

function UserProfile() {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/user-login"); // Redirect to login if no token
        return;
      }

      try {
        // Decode token to get user_id
        const decoded = jwtDecode(token);
        const user_id = decoded.user_id;

        // Fetch user data from the backend
        const response = await fetch(`http://localhost:8081/get-user-data`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch user data");
          return; // Stop further processing
        }

        // If the response is OK, parse the JSON
        const data = await response.json();
        setUserData(data); // Set user data
      } catch (err) {
        console.log("Error fetching user data:", err.message || err);
        console.log("Error stack:", err.stack);
        setError("Invalid or expired session. Please log in again.");
        localStorage.removeItem("token");
        navigate("/user-login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/user-login"); // Redirect to login page
  };

  return (
    <div className={styles.maincontainer}>
      <NavBar />
      <div className={styles.bodycontainer}>
        <div className={styles.userprofilecontainer}>
          <h2>User Account</h2>
          {error ? (
            <div style={{ color: "red" }}>{error}</div>
          ) : (
            <div>
              <div>
                <strong>Name:</strong> {userData.full_name}
              </div>
              <div>
                <strong>Email:</strong> {userData.email}
              </div>
              <div>
                <strong>Role:</strong> {userData.role}
              </div>
              {/* <div>
                <strong>Total Movies Watched: </strong> n/a
              </div>
              <div>
                <strong>Total Movies Rated: </strong> n/a
              </div> */}
            </div>
          )}
          <button className={styles.logoutbutton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
