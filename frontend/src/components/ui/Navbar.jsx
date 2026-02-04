import { useState, useEffect } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { FaSun, FaMoon, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import NavBarLink from './NavBarLink';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import AuthModal from '../auth/AuthModal';

const NavBar = ({numCartItems}) => {
  const { language, toggleLanguage, t } = useLang();
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleLogin = () => {
    console.log('Login button clicked - setting mode to login');
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    console.log('Signup button clicked - setting mode to signup');
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    // Reset auth mode when closing
    setAuthMode('login');
  };

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
            className={`btn ${styles.actionBtn}`}
            title={language === 'en' ? 'Switch to Amharic' : 'Switch to English'}
          >
            <FaGlobe size={16} />
            <small className="ms-1">{language.toUpperCase()}</small>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`btn ${styles.actionBtn}`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          {/* Cart Button - Only show for authenticated users */}
          {isAuthenticated && (
            <Link to="/cart" className={`btn ${styles.responsiveCart}`}>
              <FaShoppingCart size={16} />
              {numCartItems > 0 && (
                <span className="badge">
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
                className={`btn me-2 ${styles.userProfileBtn}`}
              >
                <FaUser size={14} className="me-1" />
                {user?.first_name || user?.username}
              </Link>
              <button
                className={`btn ${styles.logoutBtn}`}
                onClick={handleLogout}
              >
                {t('auth.logout')}
              </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <button
                className={`btn ${styles.loginBtn}`}
                onClick={handleLogin}
              >
                {t('auth.login')}
              </button>
              <button
                className={`btn ${styles.signupBtn}`}
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