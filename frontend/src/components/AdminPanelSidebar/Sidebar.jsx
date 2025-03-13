import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faFilm,
  faUsers,
  faFileCirclePlus,
  faPenToSquare,
  faBarsStaggered,
  faIdCard,
  faRightFromBracket,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Sidebar.module.css";

function Sidebar() {
  //handle logout
  const handleLogout = () => {
    // Clear JWT token
    localStorage.removeItem("authToken");

    window.location.href = "/admin-login";
  };

  return (
    <div className={styles.SidebarContainer}>
      <div className={styles.SiteLogoTitle}>
        <img src={logo} alt="site logo" />
        <span className={styles.SiteTitle}>MyMovieList</span>
      </div>
      <div className={styles.MainSidebar}>
        <div className={styles.SidebarTop}>
          <ul>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.activeLi : "")}
            >
              <li className={styles.MovieDetailList}>
                <span className={styles.spanList}>
                  <FontAwesomeIcon icon={faGauge} />
                  Dashboard
                </span>
              </li>
            </NavLink>

            <NavLink
              to="/add-movie"
              className={({ isActive }) => (isActive ? styles.activeLi : "")}
            >
              <li className={styles.MovieDetailList}>
                <span className={styles.spanList}>
                  <FontAwesomeIcon icon={faFileCirclePlus} />
                  Add Movie
                </span>
              </li>
            </NavLink>

            <NavLink
              to="/edit-movie"
              className={({ isActive }) => (isActive ? styles.activeLi : "")}
            >
              <li className={styles.MovieDetailList}>
                <span className={styles.spanList}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  Edit Movie
                </span>
              </li>
            </NavLink>

            {/* <NavLink
              to="/genres"
              className={({ isActive }) => (isActive ? styles.activeLi : "")}
            >
              <li className={styles.MovieDetailList}>
                <span>
                    <FontAwesomeIcon icon={faBarsStaggered} />
                    Genres
                </span>
              </li>
            </NavLink> */}

            <NavLink
              to="/manage-users"
              className={({ isActive }) => (isActive ? styles.activeLi : "")}
            >
              <li className={styles.ManageUsers}>
                <span className={styles.spanList}>
                  <FontAwesomeIcon icon={faUsers} />
                  Manage Users
                </span>
              </li>
            </NavLink>
          </ul>
        </div>

        <div className={styles.SidebarBottom}>
          <ul>
            {/* <NavLink
              to="/admin-settings"
              className={({ isActive }) => (isActive ? styles.activeLi : "")}
            >
              <li className="AdminSettings">
                <span>
                    <FontAwesomeIcon icon={faSliders} />
                    Admin Setting
                </span>
              </li>
            </NavLink> */}

            <NavLink className="">
              <li className={styles.Logout}>
                <span onClick={handleLogout} className={styles.spanList}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  Logout
                </span>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
