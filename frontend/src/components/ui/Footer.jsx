import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LangContext';

const Footer = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  
  const handleProductsClick = (e) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const shopSection = document.getElementById('shop');
      if (shopSection) {
        shopSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  return (
    <footer className="py-3" style={{ backgroundColor: '#6050DC', color: 'white' }}>
      <div className="container text-center">
        {/* Quick link section */}
        <div className="mb-2">
          <Link to="/" className="text-white text-decoration-none mx-2">{t('nav.home')}</Link>
          <Link to="/about" className="text-white text-decoration-none mx-2">{t('footer.about')}</Link>
          <a href="#shop" onClick={handleProductsClick} className="text-white text-decoration-none mx-2" style={{ cursor: 'pointer' }}>
            {t('nav.products')}
          </a>
          <Link to="/contact" className="text-white text-decoration-none mx-2">{t('footer.contact')}</Link>
        </div>

        {/* Social media icons section */}
        <div className="mb-2 text-white flex justify-center gap-4 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FaInstagram />
          </a>
        </div>

        {/* Copyright section */}
        <p className="small mb-0">&copy; {new Date().getFullYear()} {t('brand.name')}. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}

export default Footer;
