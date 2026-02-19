import { useLang } from '../context/LangContext';
import { useEffect, useState, useRef } from 'react';
import './About.css';
import yaredPhoto from '../assets/yared-gezahegn.png';
import yosefPhoto from '../assets/yosef-abire.jpg';
import { 
  FaTruck, 
  FaAward, 
  FaPhone, 
  FaUsers, 
  FaSeedling, 
  FaRocket, 
  FaShieldAlt,
  FaLinkedin,
  FaGithub
} from 'react-icons/fa';

const About = () => {
  const { t } = useLang();
  const [customers, setCustomers] = useState(0);
  const [products, setProducts] = useState(0);
  const [years, setYears] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  // Slideshow effect
  useEffect(() => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    const nextSlide = () => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    };

    const slideInterval = setInterval(nextSlide, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  // Counter animation effect with modern spring animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter(setCustomers, 10000, 2500);
            animateCounter(setProducts, 500, 2500);
            animateCounter(setYears, 5, 2500);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounter = (setter, target, duration) => {
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Modern easing with bounce effect (easeOutExpo + slight overshoot)
      let eased;
      if (progress === 1) {
        eased = 1;
      } else {
        eased = 1 - Math.pow(2, -10 * progress);
      }
      
      const current = Math.floor(eased * target);
      setter(current);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setter(target);
      }
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-slideshow">
          <div className="slideshow-container">
            <div className="slide active">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                alt="Nike Shoes" 
                className="slide-image"
              />
            </div>
            <div className="slide">
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                alt="Smart Watch" 
                className="slide-image"
              />
            </div>
            <div className="slide">
              <img 
                src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                alt="Sunglasses" 
                className="slide-image"
              />
            </div>
            <div className="slide">
              <img 
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                alt="Designer Bag" 
                className="slide-image"
              />
            </div>
            <div className="slide">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                alt="Headphones" 
                className="slide-image"
              />
            </div>
            <div className="slide">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                alt="Fashion Clothing" 
                className="slide-image"
              />
            </div>
          </div>
          <div className="slideshow-overlay"></div>
        </div>
        <div className="container hero-content">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-6">
              <h1 className="about-title">{t('about.title')}</h1>
              <p className="about-subtitle">{t('about.subtitle')}</p>
              <div className="about-stats" ref={statsRef}>
                <div className="stat-item">
                  <h3>{customers >= 1000 ? `${(customers / 1000).toFixed(0)}K+` : `${customers}+`}</h3>
                  <p>{t('about.customers')}</p>
                </div>
                <div className="stat-item">
                  <h3>{products}+</h3>
                  <p>{t('about.products')}</p>
                </div>
                <div className="stat-item">
                  <h3>{years}+</h3>
                  <p>{t('about.years')}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              {/* Content can be added here if needed */}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="section-title">{t('about.mission.title')}</h2>
              <p className="section-description">{t('about.mission.description')}</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaTruck />
                </div>
                <h4>{t('about.features.shipping.title')}</h4>
                <p>{t('about.features.shipping.description')}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaAward />
                </div>
                <h4>{t('about.features.quality.title')}</h4>
                <p>{t('about.features.quality.description')}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaPhone />
                </div>
                <h4>{t('about.features.support.title')}</h4>
                <p>{t('about.features.support.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="section-title">{t('about.team.title')}</h2>
              <p className="section-description">{t('about.team.description')}</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6">
              <div className="team-card">
                <div className="team-image">
                  <img 
                    src={yaredPhoto}
                    alt="Frontend Developer" 
                    className="img-fluid"
                  />
                </div>
                <div className="team-info">
                  <h5>Yared Gezahegn</h5>
                  <p className="team-role">{t('about.team.frontend')}</p>
                  <div className="team-social">
                    <a href="https://www.linkedin.com/in/yared-gezahegn-224368388/" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                    <a href="https://github.com/JaredGezahegn" target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="team-card">
                <div className="team-image">
                  <img 
                    src={yosefPhoto}
                    alt="Backend Developer" 
                    className="img-fluid"
                  />
                </div>
                <div className="team-info">
                  <h5>Yosef Abire</h5>
                  <p className="team-role">{t('about.team.backend')}</p>
                  <div className="team-social">
                    <a href="https://www.linkedin.com/in/yosef-abire-4a5841394" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                    <a href="https://github.com/YosefAbire" target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="section-title">{t('about.values.title')}</h2>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6">
              <div className="value-card">
                <div className="value-icon">
                  <FaUsers />
                </div>
                <div className="value-content">
                  <h4>{t('about.values.customer.title')}</h4>
                  <p>{t('about.values.customer.description')}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="value-card">
                <div className="value-icon">
                  <FaSeedling />
                </div>
                <div className="value-content">
                  <h4>{t('about.values.sustainability.title')}</h4>
                  <p>{t('about.values.sustainability.description')}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="value-card">
                <div className="value-icon">
                  <FaRocket />
                </div>
                <div className="value-content">
                  <h4>{t('about.values.innovation.title')}</h4>
                  <p>{t('about.values.innovation.description')}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="value-card">
                <div className="value-icon">
                  <FaShieldAlt />
                </div>
                <div className="value-content">
                  <h4>{t('about.values.integrity.title')}</h4>
                  <p>{t('about.values.integrity.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;