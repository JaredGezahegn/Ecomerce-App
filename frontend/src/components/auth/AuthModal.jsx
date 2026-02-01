import { useState } from 'react';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';

// Complete SignUp component with compact layout
const SignUpForm = ({ onSuccess, onSwitchToLogin }) => {
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
    // Clear field error when user starts typing
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
        state: '', // Optional field, can be empty
        address: '' // Optional field, can be empty
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
    <div className="card shadow-lg">
      <div className="card-body p-4">
        <h3 className="card-title text-center mb-3">{t('auth.signup')}</h3>
        
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            <small>{error}</small>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="row">
            <div className="col-6 mb-2">
              <label htmlFor="first_name" className="form-label small">
                {t('auth.firstName')}
              </label>
              <input
                type="text"
                className={`form-control form-control-sm ${fieldErrors.first_name ? 'is-invalid' : ''}`}
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              {fieldErrors.first_name && (
                <div className="invalid-feedback small">{fieldErrors.first_name}</div>
              )}
            </div>

            <div className="col-6 mb-2">
              <label htmlFor="last_name" className="form-label small">
                {t('auth.lastName')}
              </label>
              <input
                type="text"
                className={`form-control form-control-sm ${fieldErrors.last_name ? 'is-invalid' : ''}`}
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
              {fieldErrors.last_name && (
                <div className="invalid-feedback small">{fieldErrors.last_name}</div>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="mb-2">
            <label htmlFor="username" className="form-label small">
              {t('auth.username')} *
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${fieldErrors.username ? 'is-invalid' : ''}`}
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {fieldErrors.username && (
              <div className="invalid-feedback small">{fieldErrors.username}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-2">
            <label htmlFor="email" className="form-label small">
              {t('auth.email')} *
            </label>
            <input
              type="email"
              className={`form-control form-control-sm ${fieldErrors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {fieldErrors.email && (
              <div className="invalid-feedback small">{fieldErrors.email}</div>
            )}
          </div>

          {/* Password Fields */}
          <div className="row">
            <div className="col-6 mb-2">
              <label htmlFor="password" className="form-label small">
                {t('auth.password')} *
              </label>
              <input
                type="password"
                className={`form-control form-control-sm ${fieldErrors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {fieldErrors.password && (
                <div className="invalid-feedback small">{fieldErrors.password}</div>
              )}
            </div>

            <div className="col-6 mb-2">
              <label htmlFor="confirmPassword" className="form-label small">
                {t('auth.confirmPassword')} *
              </label>
              <input
                type="password"
                className={`form-control form-control-sm ${fieldErrors.confirmPassword ? 'is-invalid' : ''}`}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {fieldErrors.confirmPassword && (
                <div className="invalid-feedback small">{fieldErrors.confirmPassword}</div>
              )}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="row">
            <div className="col-6 mb-2">
              <label htmlFor="phone" className="form-label small">
                {t('auth.phone')}
              </label>
              <input
                type="tel"
                className={`form-control form-control-sm ${fieldErrors.phone ? 'is-invalid' : ''}`}
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {fieldErrors.phone && (
                <div className="invalid-feedback small">{fieldErrors.phone}</div>
              )}
            </div>

            <div className="col-6 mb-3">
              <label htmlFor="city" className="form-label small">
                {t('auth.city')}
              </label>
              <input
                type="text"
                className={`form-control form-control-sm ${fieldErrors.city ? 'is-invalid' : ''}`}
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {fieldErrors.city && (
                <div className="invalid-feedback small">{fieldErrors.city}</div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={loading}
            style={{ backgroundColor: '#6050DC', borderColor: '#6050DC' }}
          >
            {loading ? t('common.loading') : t('auth.signup')}
          </button>
        </form>

        <div className="text-center">
          <p className="mb-0 small">
            {t('auth.hasAccount')}{' '}
            <button
              type="button"
              className="btn btn-link p-0 small"
              onClick={onSwitchToLogin}
            >
              {t('auth.login')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { t } = useLang();
  const [mode, setMode] = useState(initialMode);
  const [message, setMessage] = useState('');

  console.log('AuthModal props:', { isOpen, initialMode }); // Debug log

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

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0">
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-0">
            {message && (
              <div className="alert alert-success mx-4 mt-3" role="alert">
                {message}
              </div>
            )}
            
            <div className="row g-0">
              {/* Left side - Form */}
              <div className="col-md-8 p-4">
                {mode === 'login' ? (
                  <LoginForm
                    onSuccess={handleLoginSuccess}
                    onSwitchToSignup={switchToSignup}
                  />
                ) : (
                  <SignUpForm
                    onSuccess={handleSignupSuccess}
                    onSwitchToLogin={switchToLogin}
                  />
                )}
              </div>
              
              {/* Right side - Welcome message */}
              <div 
                className="col-md-4 d-flex align-items-center justify-content-center text-white p-4"
                style={{
                  background: 'linear-gradient(135deg, #6B46C1 0%, #8B5CF6 50%, #A78BFA 100%)',
                  borderTopRightRadius: '0.375rem',
                  borderBottomRightRadius: '0.375rem'
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
    </div>
  );
};

export default AuthModal;