import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ManageUsers.module.css";
import Sidebar from "../../../components/AdminPanelSidebar/Sidebar";
import { Link } from "react-router-dom";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/manage-users/get-user-list"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data); // Set user data
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch user data. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/manage-users/delete-user/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete user with ID: ${userId}`);
      }

      // If successful, update the users list
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.user_id !== userId)
      );
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user. Please try again later.");
    }
  };

  return (
    <div className={styles.bodycontainer}>
      <Sidebar />
      <div className={styles.maincontainer}>
        <h2>User List</h2>

        {/* Display error if any */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Display user data in a table */}
        {users.length > 0 ? (
          <table className={styles.resulttable}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteUser(user.user_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
