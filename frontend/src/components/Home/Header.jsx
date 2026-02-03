import { useState, useEffect } from 'react';  
import { useLang } from '../../context/LangContext';

const Header = () => {
  const { t } = useLang();

  useEffect(() => {
    const slides = document.querySelectorAll('.home-slide');
    let currentSlide = 0;

    const nextSlide = () => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    };

    const slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <header className="home-hero">
      <div className="home-slideshow">
        <div className="home-slideshow-container">
          <div className="home-slide active">
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Electronics" 
              className="home-slide-image"
            />
          </div>
          <div className="home-slide">
            <img 
              src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Sneakers" 
              className="home-slide-image"
            />
          </div>
          <div className="home-slide">
            <img 
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Perfume" 
              className="home-slide-image"
            />
          </div>
          <div className="home-slide">
            <img 
              src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Cosmetics" 
              className="home-slide-image"
            />
          </div>
          <div className="home-slide">
            <img 
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Books" 
              className="home-slide-image"
            />
          </div>
          <div className="home-slide">
            <img 
              src="https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Home Decor" 
              className="home-slide-image"
            />
          </div>
        </div>
        <div className="home-slideshow-overlay"></div>
      </div>
      <div className="container home-hero-content">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <h1 className="home-title">{t('home.title')}</h1>
            <p className="home-subtitle">{t('home.subtitle')}</p>
          </div>
        </div>
      </div>
    </header>
  );    
}

export default Header;