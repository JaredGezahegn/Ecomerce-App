import { useState, useEffect } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { FaSun, FaMoon, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import NavBarLink from './NavBarLink';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';

const NavBar = ({numCartItems}) => {
  const { language, toggleLanguage, t } = useLang();
  const { user, isAuthenticated, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

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

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  // Clear language localStorage to force Amharic default
  useEffect(() => {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'am');
    }
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm py-3 ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'
        } ${styles.stickyNav}`}>
      <div className={`container ${styles.navbarContainer}`}>
        {/* Left: Brand Name */}
        <div className={styles.navBrand}>
          <Link className={`navbar-brand fw-bold text-uppercase ${styles.brandLink}`} to="/">
            {t('brand.name')}
          </Link>
        </div>

        {/* Mobile Toggle Button */}
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

        {/* Center: Navigation Links */}
        <div className={`collapse navbar-collapse ${styles.navCenter}`} id="navbarContent">
          <div className={styles.navLinksWrapper}>
            <NavBarLink />
          </div>
        </div>

        {/* Right: Actions */}
        <div className={`${styles.navActions} d-flex align-items-center`}>
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'} me-2 ${styles.actionBtn}`}
            title={language === 'en' ? 'Switch to Amharic' : 'Switch to English'}
          >
            <FaGlobe size={16} />
            <small className="ms-1">{language.toUpperCase()}</small>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'} me-2 ${styles.actionBtn}`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          {/* Cart Button - Only show for authenticated users */}
          {isAuthenticated && (
            <Link to="/cart" className={`btn me-2 position-relative ${styles.responsiveCart} ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}>
              <FaShoppingCart size={16} className={isDarkMode ? 'text-light' : 'text-dark'} />
              {numCartItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {numCartItems}
                </span>
              )}
            </Link>
          )}

          {/* Authentication Section */}
          {isAuthenticated ? (
            <div className="d-flex align-items-center">
              <Link 
                to="/profile" 
                className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'} me-2 ${styles.actionBtn}`}
              >
                <FaUser size={14} className="me-1" />
                {user?.first_name || user?.username}
              </Link>
              <button
                className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'} ${styles.actionBtn}`}
                onClick={handleLogout}
              >
                {t('auth.logout')}
              </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <button
                className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'} me-2 ${styles.loginBtn}`}
                onClick={handleLogin}
              >
                {t('auth.login')}
              </button>
              <button
                className={`btn btn-primary ${styles.signupBtn}`}
                onClick={handleSignup}
              >
                {t('auth.signup')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={closeAuthModal}
        initialMode={authMode}
      />
    </nav>
  );
}

export default NavBar;