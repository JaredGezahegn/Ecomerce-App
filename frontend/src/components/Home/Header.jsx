import React, { useState, useEffect } from 'react';  
import { useLang } from '../../context/LangContext';
import api from '../../api';

const Header = () => {
  const { t } = useLang();
  const [productImages, setProductImages] = useState([]);
  
  // Fallback images if API fails
  const fallbackImages = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200&h=200&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop&crop=center'
  ];

  useEffect(() => {
    // Try to fetch actual product images from API
    api.get('products')
      .then(res => {
        const images = res.data
          .filter(product => product.thumbnail)
          .slice(0, 8)
          .map(product => product.thumbnail);
        
        if (images.length > 0) {
          setProductImages(images);
        } else {
          setProductImages(fallbackImages);
        }
      })
      .catch(err => {
        console.log('Using fallback images:', err.message);
        setProductImages(fallbackImages);
      });
  }, []);

  return (
    <header 
      className="py-5 position-relative overflow-hidden" 
      style={{ 
        background: 'linear-gradient(135deg, #6B46C1 0%, #8B5CF6 25%, #A78BFA 50%, #C4B5FD 75%, #7DD3FC 100%)',
        minHeight: '500px'
      }}
    >
      {/* Animated Background Elements */}
      <div 
        className="position-absolute"
        style={{
          top: '-50px',
          left: '-50px',
          width: '300px',
          height: '300px',
          background: 'rgba(139,92,246,0.3)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite'
        }}
      ></div>
      <div 
        className="position-absolute"
        style={{
          bottom: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'rgba(167,139,250,0.2)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}
      ></div>
      
      {/* Floating Product Images */}
      {productImages.map((image, index) => (
        <div
          key={index}
          className="position-absolute d-none d-md-block"
          style={{
            top: `${15 + (index % 3) * 25}%`,
            left: `${10 + (index % 4) * 20}%`,
            animation: `floatProduct ${4 + (index % 3)}s ease-in-out infinite`,
            animationDelay: `${(index * 0.5)}s`,
            opacity: 0.6,
            zIndex: 1
          }}
        >
          <div
            className="rounded-circle shadow-lg position-relative"
            style={{
              width: '70px',
              height: '70px',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '3px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              animation: `spin ${15 + (index % 5) * 5}s linear infinite`,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.2)';
              e.target.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.opacity = '0.6';
            }}
          >
            {/* Glowing effect */}
            <div
              className="position-absolute rounded-circle"
              style={{
                top: '-5px',
                left: '-5px',
                right: '-5px',
                bottom: '-5px',
                background: 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
                borderRadius: '50%',
                animation: `glow ${3 + (index % 2)}s ease-in-out infinite alternate`,
                zIndex: -1
              }}
            ></div>
          </div>
        </div>
      ))}
      
      {/* Floating particles */}
      {[...Array(6)].map((_, index) => (
        <div
          key={`particle-${index}`}
          className="position-absolute d-none d-lg-block"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 90 + 5}%`,
            width: '4px',
            height: '4px',
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '50%',
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        ></div>
      ))}
      
      {/* Main Content */}
      <div className="container px-4 px-lg-5 my-5 position-relative" style={{ zIndex: 2 }}>
          <div className="text-center text-white">
              <h1 
                className="display-4 fw-bolder mb-4" 
                style={{ 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  animation: 'fadeInUp 1s ease-out'
                }}
              >
                {t('home.title')}
              </h1>
              <p 
                className="lead fw-normal text-white-50 mb-4" 
                style={{ 
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  animation: 'fadeInUp 1s ease-out 0.2s both'
                }}
              >
                {t('home.subtitle')}
              </p>
              <a 
                href="#shop" 
                className="btn btn-light btn-lg rounded-pill px-4 py-2 shadow position-relative"
                style={{
                  animation: 'fadeInUp 1s ease-out 0.4s both',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px) scale(1.05)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                }}
              >
                <span className="position-relative" style={{ zIndex: 2 }}>
                  {t('home.viewAll')}
                </span>
                {/* Button shine effect */}
                <div
                  className="position-absolute"
                  style={{
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: 'shine 3s ease-in-out infinite',
                    zIndex: 1
                  }}
                ></div>
              </a>
          </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes floatProduct {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-15px) translateX(5px) scale(1.05); }
          50% { transform: translateY(-10px) translateX(-5px) scale(0.95); }
          75% { transform: translateY(-20px) translateX(3px) scale(1.02); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem !important;
          }
        }
      `}</style>
    </header>
  );    
}

export default Header;