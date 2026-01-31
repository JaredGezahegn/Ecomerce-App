import React from 'react';  
import { useLang } from '../../context/LangContext';

const Header = () => {
  const { t } = useLang();
  
  return (
    <header 
      className="py-5" 
      style={{ 
        background: 'linear-gradient(135deg, #6B46C1 0%, #8B5CF6 25%, #A78BFA 50%, #C4B5FD 75%, #7DD3FC 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '400px'
      }}
    >
      {/* Decorative elements */}
      <div 
        style={{
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          width: '300px',
          height: '300px',
          background: 'rgba(139,92,246,0.3)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}
      ></div>
      <div 
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'rgba(167,139,250,0.2)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}
      ></div>
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '200px',
          background: 'rgba(125,211,252,0.15)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}
      ></div>
      
      <div className="container px-4 px-lg-5 my-5" style={{ position: 'relative', zIndex: 2 }}>
          <div className="text-center text-white">
              <h1 className="display-4 fw-bolder" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                {t('home.title')}
              </h1>
              <p className="lead fw-normal text-white-50 mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                {t('home.subtitle')}
              </p>
              <a href="#shop" className="btn btn-light btn-lg rounded-pill px-4 py-2 shadow">
                {t('home.viewAll')}
              </a>
          </div>
      </div>
    </header>
  );    
}
export default Header;