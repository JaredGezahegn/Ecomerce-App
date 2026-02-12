import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';

// Compact SignUp component with modern styling
const SignUpForm = ({ onSuccess, onSwitchToLogin, isDarkMode }) => {
  const { t } = useLang();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (fieldErrors[e.target.name]) {
      setFieldErrors({
        ...fieldErrors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = t('auth.passwordMismatch');
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const signupData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        city: formData.city,
        state: '',
        address: ''
      };

      const result = await signup(signupData);
      
      if (result.success) {
        onSuccess && onSuccess(result.data);
      } else {
        if (typeof result.error === 'object') {
          setFieldErrors(result.error);
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError(t('auth.signupFailed'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="h-100 d-flex flex-column">
      <div className="text-center mb-2">
        <h4 className={`mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
          {t('auth.signup')}
        </h4>
        <p className={`small mb-0 ${isDarkMode ? 'text-light' : 'text-muted'}`} style={{ fontSize: '0.8rem' }}>
          Create your account to get started
        </p>
      </div>
      
      {error && (
        <div className="alert alert-danger py-1 mb-2" role="alert" style={{ fontSize: '0.75rem' }}>
          <small>{error}</small>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex-grow-1">
        {/* Name Fields */}
        <div className="row mb-1">
          <div className="col-6">
            <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.75rem', marginBottom: '2px' }}>
              {t('auth.firstName')}
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${fieldErrors.first_name ? 'is-invalid' : ''}`}
              placeholder={t('auth.firstName')}
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              style={{
                backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
                color: isDarkMode ? '#f5f5f5' : '#000000',
                borderColor: isDarkMode ? '#404040' : '#ced4da',
                fontSize: '0.8rem',
                padding: '6px 10px'
              }}
            />
            {fieldErrors.first_name && (
              <div className="invalid-feedback" style={{ fontSize: '0.7rem' }}>{fieldErrors.first_name}</div>
            )}
          </div>
          <div className="col-6">
            <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.75rem', marginBottom: '2px' }}>
              {t('auth.lastName')}
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${fieldErrors.last_name ? 'is-invalid' : ''}`}
              placeholder={t('auth.lastName')}
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              style={{
                backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
                color: isDarkMode ? '#f5f5f5' : '#000000',
                borderColor: isDarkMode ? '#404040' : '#ced4da',
                fontSize: '0.8rem',
                padding: '6px 10px'
              }}
            />
            {fieldErrors.last_name && (
              <div className="invalid-feedback" style={{ fontSize: '0.7rem' }}>{fieldErrors.last_name}</div>
            )}
          </div>
        </div>

        {/* Username & Email */}
        <div className="mb-1">
          <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.75rem', marginBottom: '2px' }}>
            {t('auth.username')} *
          </label>
          <input
            type="text"
            className={`form-control form-control-sm ${fieldErrors.username ? 'is-invalid' : ''}`}
            placeholder={`${t('auth.username')} *`}
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
              color: isDarkMode ? '#f5f5f5' : '#000000',
              borderColor: isDarkMode ? '#404040' : '#ced4da',
              fontSize: '0.8rem',
              padding: '6px 10px'
            }}
          />
          {fieldErrors.username && (
            <div className="invalid-feedback" style={{ fontSize: '0.7rem' }}>{fieldErrors.username}</div>
          )}
        </div>

        <div className="mb-1">
          <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.75rem', marginBottom: '2px' }}>
            {t('auth.email')} *
          </label>
          <input
            type="email"
            className={`form-control form-control-sm ${fieldErrors.email ? 'is-invalid' : ''}`}
            placeholder={`${t('auth.email')} *`}
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
              color: isDarkMode ? '#f5f5f5' : '#000000',
              borderColor: isDarkMode ? '#404040' : '#ced4da',
              fontSize: '0.8rem',
              padding: '6px 10px'
            }}
          />
          {fieldErrors.email && (
            <div className="invalid-feedback" style={{ fontSize: '0.7rem' }}>{fieldErrors.email}</div>
          )}
        </div>

        {/* Password Fields */}
        <div className="row mb-1">
          <div className="col-6">
            <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.75rem', marginBottom: '2px' }}>
              {t('auth.password')} *
            </label>
            <input
              type="password"
              className={`form-control form-control-sm ${fieldErrors.password ? 'is-invalid' : ''}`}
              placeholder={`${t('auth.password')} *`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
                color: isDarkMode ? '#f5f5f5' : '#000000',
                borderColor: isDarkMode ? '#404040' : '#ced4da',
                fontSize: '0.8rem',
                padding: '6px 10px'
              }}
            />
            {fieldErrors.password && (
              <div className="invalid-feedback" style={{ fontSize: '0.7rem' }}>{fieldErrors.password}</div>
            )}
          </div>
          <div className="col-6">
            <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.75rem', marginBottom: '2px' }}>
              {t('auth.confirmPassword')} *
            </label>
            <input
              type="password"
              className={`form-control form-control-sm ${fieldErrors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder={`${t('auth.confirmPassword')} *`}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
                color: isDarkMode ? '#f5f5f5' : '#000000',
                borderColor: isDarkMode ? '#404040' : '#ced4da',
                fontSize: '0.8rem',
                padding: '6px 10px'
              }}
            />
            {fieldErrors.confirmPassword && (
              <div className="invalid-feedback" style={{ fontSize: '0.7rem' }}>{fieldErrors.confirmPassword}</div>
            )}
          </div>
        </div>

        {/* Contact Fields */}
        <div className="row mb-2">
          <div className="col-6">
            <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.75rem', marginBottom: '2px' }}>
              {t('auth.phone')}
            </label>
            <input
              type="tel"
              className={`form-control form-control-sm ${fieldErrors.phone ? 'is-invalid' : ''}`}
              placeholder={t('auth.phone')}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{
                backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
                color: isDarkMode ? '#f5f5f5' : '#000000',
                borderColor: isDarkMode ? '#404040' : '#ced4da',
                fontSize: '0.8rem',
                padding: '6px 10px'
              }}
            />
            {fieldErrors.phone && (
              <div className="invalid-feedback" style={{ fontSize: '0.7rem' }}>{fieldErrors.phone}</div>
            )}
          </div>
          <div className="col-6">
            <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.75rem', marginBottom: '2px' }}>
              {t('auth.city')}
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${fieldErrors.city ? 'is-invalid' : ''}`}
              placeholder={t('auth.city')}
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={{
                backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
                color: isDarkMode ? '#f5f5f5' : '#000000',
                borderColor: isDarkMode ? '#404040' : '#ced4da',
                fontSize: '0.8rem',
                padding: '6px 10px'
              }}
            />
            {fieldErrors.city && (
              <div className="invalid-feedback" style={{ fontSize: '0.7rem' }}>{fieldErrors.city}</div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center mb-2">
          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{ 
              background: 'linear-gradient(135deg, #6050DC, #8B5CF6)',
              border: 'none',
              color: 'white',
              fontSize: '0.8rem',
              padding: '8px 24px',
              fontWeight: '500',
              borderRadius: '20px',
              minWidth: '120px',
              boxShadow: '0 2px 8px rgba(96, 80, 220, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(96, 80, 220, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(96, 80, 220, 0.3)';
            }}
          >
            {loading ? t('common.loading') : t('auth.signup')}
          </button>
        </div>
      </form>

      <div className="text-center">
        <p className={`mb-0 ${isDarkMode ? 'text-light' : 'text-muted'}`} style={{ fontSize: '0.75rem' }}>
          {t('auth.hasAccount')}{' '}
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none"
            onClick={onSwitchToLogin}
            style={{ color: '#6050DC', fontSize: '0.75rem' }}
          >
            {t('auth.login')}
          </button>
        </p>
      </div>
    </div>
  );
};

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { t } = useLang();
  const [mode, setMode] = useState(initialMode);
  const [message, setMessage] = useState('');
  
  // Get theme from body class
  const isDarkMode = document.body.classList.contains('dark-theme');

  // Update mode when initialMode changes
  useEffect(() => {
    console.log('AuthModal: initialMode changed to:', initialMode);
    setMode(initialMode);
  }, [initialMode]);

  // Reset mode when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMessage('');
    }
  }, [isOpen]);

  // Debug current mode
  useEffect(() => {
    console.log('AuthModal: current mode is:', mode);
  }, [mode]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLoginSuccess = async () => {
    setMessage(t('auth.loginSuccess'));
    setTimeout(() => {
      onClose();
      setMessage('');
    }, 1500);
  };

  const handleSignupSuccess = async () => {
    setMessage(t('auth.signupSuccess'));
    setTimeout(() => {
      onClose();
      setMessage('');
    }, 1500);
  };

  const switchToSignup = () => {
    setMode('signup');
    setMessage('');
  };

  const switchToLogin = () => {
    setMode('login');
    setMessage('');
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="modal fade show d-block" 
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.7)', 
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        padding: '20px',
        margin: 0
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        style={{ 
          maxWidth: '900px',
          width: '100%',
          margin: 'auto',
          display: 'block'
        }}
      >
        <div 
          className={`border-0 shadow-lg ${isDarkMode ? 'bg-dark' : 'bg-white'}`}
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            maxHeight: '90vh',
            position: 'relative',
            width: '100%',
            margin: '0 auto'
          }}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              right: '1rem',
              top: '1rem',
              zIndex: 10,
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              color: isDarkMode ? '#fff' : '#000',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              padding: 0
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>
          
          {/* Header - removed since we have the close button */}
          <div style={{ padding: '0.5rem' }}></div>
          
          {/* Body */}
          <div className="modal-body p-0" style={{ overflow: 'hidden' }}>
            {message && (
              <div className="alert alert-success mx-4 mb-3" role="alert">
                {message}
              </div>
            )}
            
            <div className="row g-0" style={{ minHeight: '450px' }}>
              {/* Left side - Form */}
              <div className="col-md-8 p-4">
                {mode === 'login' ? (
                  <LoginForm
                    onSuccess={handleLoginSuccess}
                    onSwitchToSignup={switchToSignup}
                    isDarkMode={isDarkMode}
                  />
                ) : (
                  <SignUpForm
                    onSuccess={handleSignupSuccess}
                    onSwitchToLogin={switchToLogin}
                    isDarkMode={isDarkMode}
                  />
                )}
              </div>
              
              {/* Right side - Welcome message */}
              <div 
                className="col-md-4 d-flex align-items-center justify-content-center text-white p-4"
                style={{
                  background: 'linear-gradient(135deg, #6B46C1 0%, #8B5CF6 50%, #A78BFA 100%)',
                  borderTopRightRadius: '16px',
                  borderBottomRightRadius: '16px'
                }}
              >
                <div className="text-center">
                  <h4 className="mb-3">
                    {mode === 'login' ? t('auth.welcome') : 'Join Us!'}
                  </h4>
                  <p className="mb-0">
                    {mode === 'login' 
                      ? 'Sign in to access your account and continue shopping'
                      : 'Create an account to start your shopping journey'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AuthModal;