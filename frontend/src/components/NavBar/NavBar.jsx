import React, { useState } from 'react';
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import Styles from './NavBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faFilm, faList, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.png';

function NavBar() {

  const [searchTitle, setSearchTitle] = useState(''); // State for search input
  const navigate = useNavigate();
  const location = useLocation(); 

  // Update state when the input value changes
  const handleInputChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleSearch = () => {
    if (!searchTitle.trim()) return; // Prevent empty search
    navigate(`/browse-movie/${searchTitle}`); // Navigate to the SearchResult page with the search title
  };

  return (
    <div className={Styles.container}>
      {/* Left Section: Logo and Heading */}
      <div className={Styles.leftSection}>
        <Link to="/">
          <img src={Logo} alt="MyMovieList Logo" className={Styles.logo} />
        </Link>
        <Link to="/">
          <h2 className={Styles.heading}>MyMovieList</h2>
        </Link>
      </div>

      {/* Middle Section: Search Bar */}
      {location.pathname !== '/' && !location.pathname.startsWith('/browse-movie') &&  (
        <div className={Styles.searchSection}>
          <input
            type="text"
            placeholder="Search Title..."
            className={Styles.searchInput}
            value={searchTitle} 
            onChange={handleInputChange} // Update state on input change
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <input type='submit' onClick={handleSearch} className={Styles.searchButton} value='🔍'/>
        </div>
      )}

      {/* Right Section: Navbar Links */}
      <div className={Styles.rightSection}>
        <Link to="/browse-movie" className={Styles.box}>
          <FontAwesomeIcon icon={faFilm} className={Styles.icon} /> Browse
        </Link>
        {/* <Link to="/trending" className={Styles.box}>
          <FontAwesomeIcon icon={faFire} className={Styles.icon} /> Trending
        </Link> */}
        <Link to="/watchlist" className={Styles.box}>
          <FontAwesomeIcon icon={faList} className={Styles.icon} /> Watchlist
        </Link>
        <Link to="/user-login" className={Styles.box}>
          <FontAwesomeIcon icon={faSignInAlt} className={Styles.icon} /> Account
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
