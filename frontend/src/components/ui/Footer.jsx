import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useLang } from '../../context/LangContext';

const Footer = () => {
  const { t } = useLang();
  
  return (
    <footer className="py-3" style={{ backgroundColor: '#6050DC', color: 'white' }}>
      <div className="container text-center">
        {/* Quick link section */}
        <div className="mb-2">
          <a href="#home" className="text-white text-decoration-none mx-2">{t('nav.home')}</a>
          <a href="#about" className="text-white text-decoration-none mx-2">{t('footer.about')}</a>
          <a href="#services" className="text-white text-decoration-none mx-2">{t('nav.products')}</a> 
          <a href="#contact" className="text-white text-decoration-none mx-2">{t('footer.contact')}</a>
        </div>

        {/* Social media icons section */}
        <div className="mb-2 text-white flex justify-center gap-4 text-xl">
          <a href="https://facebook.com" className="text-white mx-2">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" className="text-white mx-2">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" className="text-white mx-2">
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
