import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-3" style={{ backgroundColor: '#6050DC', color: 'white' }}>
      <div className="container text-center">
        {/* Quick link section */}
        <div className="mb-2">
          <a href="#home" className="text-white text-decoration-none mx-2">Home</a>
          <a href="#about" className="text-white text-decoration-none mx-2">About</a>
          <a href="#services" className="text-white text-decoration-none mx-2">Shop</a> 
          <a href="#contact" className="text-white text-decoration-none mx-2">Contact</a>
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
        <p className="small mb-0">&copy; {new Date().getFullYear()} ባለ ሱቅ. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
