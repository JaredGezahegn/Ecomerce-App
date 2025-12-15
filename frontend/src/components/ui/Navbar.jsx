import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaSun, FaMoon, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import NavBarLink from './NavBarLink';

const NavBar = ({numCartItems}) => {

  const [language, setLanguage] = useState('en'); // 'en' or 'am'
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };


  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'am' : 'en');
  };

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm py-3 ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'
        } ${styles.stickyNav}`}>
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">ባለ ሱቅ</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <NavBarLink />
          <Link to="/cart" className={`btn btn-dark ms-3 rounded-pill position-relative ${styles.responsiveCart}`}>
            <FaShoppingCart size={20} />  {/* Cart icon */}
            {numCartItems == 0 || <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
              style={{ fontSize: '0.75rem', padding: '0.5em 0.65em', backgroundColor: '#ff5733', color: 'white' }}>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{ fontSize: '0.75rem', padding: '0.5em 0.65em', backgroundColor: '#ff5733', color: 'white' }}>
                {numCartItems}
              </span>
            </span>}

          </Link>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="btn btn-outline-secondary ms-3 rounded-circle"
            title={language === 'en' ? 'Switch to Amharic' : 'Switch to English'}
          >
            <FaGlobe size={18} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-outline-secondary ms-2 rounded-circle"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>


        </div>
      </div>
    </nav>
  );
}

export default NavBar;