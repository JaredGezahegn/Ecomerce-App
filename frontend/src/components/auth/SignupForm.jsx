import { useState } from 'react';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { FaGoogle } from 'react-icons/fa';

const SignupForm = ({ onSuccess, onSwitchToLogin, isDarkMode }) => {
  const { t } = useLang();
  const { signup, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.passwordMismatch'));
      setLoading(false);
      return;
    }

    try {
      const result = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        onSuccess && onSuccess(result.user);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(t('auth.signupFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await loginWithGoogle();
      if (result.success) {
        onSuccess && onSuccess(result.user);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Google sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-100 d-flex flex-column justify-content-center">
      <div className="text-center mb-2">
        <h4 className={`mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
          {t('auth.signup')}
        </h4>
        <p className={`mb-0 ${isDarkMode ? 'text-light' : 'text-muted'}`} style={{ fontSize: '0.8rem' }}>
          Create your account to get started
        </p>
      </div>
      
      {error && (
        <div className="alert alert-danger py-1 mb-2" role="alert" style={{ fontSize: '0.75rem' }}>
          <small>{error}</small>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-2">
        <div className="row mb-2">
          <div className="col-6">
            <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.8rem', marginBottom: '4px' }}>
              {t('auth.firstName')} *
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${isDarkMode ? 'bg-dark text-white border-secondary' : ''}`}
              placeholder={t('auth.firstName')}
              name="firstName"
              value={formData.firstName}
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
          </div>
          <div className="col-6">
            <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.8rem', marginBottom: '4px' }}>
              {t('auth.lastName')} *
            </label>
            <input
              type="text"
              className={`form-control form-control-sm ${isDarkMode ? 'bg-dark text-white border-secondary' : ''}`}
              placeholder={t('auth.lastName')}
              name="lastName"
              value={formData.lastName}
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
          </div>
        </div>

        <div className="mb-2">
          <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.8rem', marginBottom: '4px' }}>
            {t('auth.email')} *
          </label>
          <input
            type="email"
            className={`form-control form-control-sm ${isDarkMode ? 'bg-dark text-white border-secondary' : ''}`}
            placeholder={t('auth.email')}
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
        </div>

        <div className="mb-2">
          <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.8rem', marginBottom: '4px' }}>
            {t('auth.password')} *
          </label>
          <input
            type="password"
            className={`form-control form-control-sm ${isDarkMode ? 'bg-dark text-white border-secondary' : ''}`}
            placeholder={t('auth.password')}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            style={{ 
              backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
              color: isDarkMode ? '#f5f5f5' : '#000000',
              borderColor: isDarkMode ? '#404040' : '#ced4da',
              fontSize: '0.8rem',
              padding: '6px 10px'
            }}
          />
        </div>

        <div className="mb-3">
          <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.8rem', marginBottom: '4px' }}>
            {t('auth.confirmPassword')} *
          </label>
          <input
            type="password"
            className={`form-control form-control-sm ${isDarkMode ? 'bg-dark text-white border-secondary' : ''}`}
            placeholder={t('auth.confirmPassword')}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
            style={{ 
              backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
              color: isDarkMode ? '#f5f5f5' : '#000000',
              borderColor: isDarkMode ? '#404040' : '#ced4da',
              fontSize: '0.8rem',
              padding: '6px 10px'
            }}
          />
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

      <div className="text-center mb-2">
        <div className="d-flex align-items-center mb-2">
          <hr className="flex-grow-1" style={{ borderColor: isDarkMode ? '#404040' : '#dee2e6' }} />
          <span className={`px-2 ${isDarkMode ? 'text-light' : 'text-muted'}`} style={{ fontSize: '0.7rem' }}>
            OR
          </span>
          <hr className="flex-grow-1" style={{ borderColor: isDarkMode ? '#404040' : '#dee2e6' }} />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className="btn w-100 d-flex align-items-center justify-content-center gap-2"
          style={{
            fontSize: '0.8rem',
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid #dadce0',
            color: '#3c4043',
            backgroundColor: '#ffffff',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f8f9fa';
            e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ffffff';
            e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
          }}
        >
          <FaGoogle style={{ fontSize: '1rem', color: '#4285f4' }} />
          <span>Continue with Google</span>
        </button>
      </div>

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

export default SignupForm;
