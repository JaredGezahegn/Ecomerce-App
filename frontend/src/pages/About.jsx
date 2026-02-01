import React from 'react';
import { useLang } from '../context/LangContext';
import './About.css';

const About = () => {
  const { t } = useLang();

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-6">
              <h1 className="about-title">{t('about.title')}</h1>
              <p className="about-subtitle">{t('about.subtitle')}</p>
              <div className="about-stats">
                <div className="stat-item">
                  <h3>10K+</h3>
                  <p>{t('about.customers')}</p>
                </div>
                <div className="stat-item">
                  <h3>500+</h3>
                  <p>{t('about.products')}</p>
                </div>
                <div className="stat-item">
                  <h3>5+</h3>
                  <p>{t('about.years')}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-image">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="About Us" 
                  className="img-fluid rounded-4 shadow-lg"
                />
              </div>
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
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h4>{t('about.features.shipping.title')}</h4>
                <p>{t('about.features.shipping.description')}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h4>{t('about.features.quality.title')}</h4>
                <p>{t('about.features.quality.description')}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-headset"></i>
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
            <div className="col-md-4">
              <div className="team-card">
                <div className="team-image">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                    alt="CEO" 
                    className="img-fluid"
                  />
                </div>
                <div className="team-info">
                  <h5>John Doe</h5>
                  <p className="team-role">{t('about.team.ceo')}</p>
                  <div className="team-social">
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-card">
                <div className="team-image">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                    alt="CTO" 
                    className="img-fluid"
                  />
                </div>
                <div className="team-info">
                  <h5>Jane Smith</h5>
                  <p className="team-role">{t('about.team.cto')}</p>
                  <div className="team-social">
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fab fa-github"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="team-card">
                <div className="team-image">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                    alt="Marketing Director" 
                    className="img-fluid"
                  />
                </div>
                <div className="team-info">
                  <h5>Mike Johnson</h5>
                  <p className="team-role">{t('about.team.marketing')}</p>
                  <div className="team-social">
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
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
                  <i className="fas fa-heart"></i>
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
                  <i className="fas fa-leaf"></i>
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
                  <i className="fas fa-lightbulb"></i>
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
                  <i className="fas fa-handshake"></i>
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