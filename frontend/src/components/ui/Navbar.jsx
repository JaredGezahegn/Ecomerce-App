import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaSun, FaMoon, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import NavBarLink from './NavBarLink';

const NavBar = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState('en'); // 'en' or 'am'

    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
      document.body.classList.toggle('bg-dark');
      document.body.classList.toggle('text-light');
    };

    const toggleLanguage = () => {
      setLanguage(language === 'en' ? 'am' : 'en');
    };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 ${styles.stickyNav}}`}>
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
           <NavBarLink/>
          <Link to="/cart" className={`btn btn-dark ms-3 rounded-pill position-relative ${styles.responsiveCart}`}>
          <FaShoppingCart size={20} />  {/* Cart icon */}
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
            style={{ fontSize: '0.75rem', padding: '0.5em 0.65em', backgroundColor: '#ff5733', color: 'white' }}>
              </span>
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