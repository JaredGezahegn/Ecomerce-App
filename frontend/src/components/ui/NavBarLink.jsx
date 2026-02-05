import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../../context/LangContext";

const NavBarLink = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  
  const handleProductsClick = (e) => {
    e.preventDefault();
    // Navigate to home page first
    navigate('/');
    // Then scroll to shop section after a brief delay
    setTimeout(() => {
      const shopSection = document.getElementById('shop');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  return (
     <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
       <li className="nav-item">
         <Link to="/" className="nav-link active fw-semibold">{t('nav.home')}</Link>
         </li>
         <li className="nav-item">
            <a href="#shop" onClick={handleProductsClick} className="nav-link fw-semibold" style={{ cursor: 'pointer' }}>
              {t('nav.products')}
            </a>
            </li>
            <li className="nav-item">
                <Link to="/about" className="nav-link fw-semibold">{t('nav.about')}</Link>
            </li>
            <li className="nav-item">
                <Link to="/contact" className="nav-link fw-semibold">{t('nav.contact')}</Link>
            </li>
     </ul>
  )
}

export default NavBarLink;