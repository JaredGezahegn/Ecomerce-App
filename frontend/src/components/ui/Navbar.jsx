import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaSun, FaMoon, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import NavBarLink from './NavBarLink';
import { useLang } from '../../context/LangContext';

const NavBar = ({numCartItems}) => {
  const { language, toggleLanguage, t } = useLang();
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

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm py-3 ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'
        } ${styles.stickyNav}`}>
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          {t('brand.name')}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <NavBarLink />
          
          {/* Cart Button */}
          <Link to="/cart" className={`btn ms-3 rounded-pill position-relative ${styles.responsiveCart} ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}>
            <FaShoppingCart size={20} className={isDarkMode ? 'text-light' : 'text-dark'} />
            {numCartItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {numCartItems}
              </span>
            )}
          </Link>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'} ms-3 rounded-circle`}
            title={language === 'en' ? 'Switch to Amharic' : 'Switch to English'}
          >
            <FaGlobe size={18} />
            <small className="ms-1">{language.toUpperCase()}</small>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'} ms-2 rounded-circle`}
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