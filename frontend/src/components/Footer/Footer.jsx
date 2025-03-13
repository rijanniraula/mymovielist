import React from "react";
import { Link } from "react-router-dom";
import Styles from "./Footer.module.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareTwitter,
  faSquareInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import logos1 from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className={Styles.footerContainer}>
      <div className={Styles.logoSection}>
        <img src={logos1} alt="MyMovieList Logo" className={Styles.logos1} />
        <p className={Styles.tagline}>Your Personal Film Library</p>
      </div>

      <div className={Styles.linksSection}>
        <div className={Styles.column}>
          <Link to="/" className={Styles.link}>
            Home
          </Link>
          <Link to="/browse-movie" className={Styles.link}>
            Browse Movies
          </Link>
          {/* <Link to="/trending" className={Styles.link}>
            Trending Movies
          </Link> */}
          {/* <Link to="/genres" className={Styles.link}>Genres</Link> */}
          <Link to="/user-login" className={Styles.link}>
            Login | Sign Up
          </Link>
        </div>
        <div className={Styles.column}>
          {/* <Link to="/about" className={Styles.link}>
            About Us
          </Link> */}
          {/* <Link to="/feedback" className={Styles.link}>Give Feedback</Link> */}
          {/* <Link to="/contact" className={Styles.link}>
            Contact Us
          </Link>{" "} */}
          <div className={Styles.socialIcons}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faSquareInstagram} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faSquareTwitter} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
