import { useState } from 'react';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';
import { FaGoogle } from 'react-icons/fa';

const LoginForm = ({ onSuccess, onSwitchToSignup, isDarkMode }) => {
  const { t } = useLang();
  const { login, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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

    try {
      const result = await login({
        username: formData.username,
        password: formData.password
      });

      if (result.success) {
        onSuccess && onSuccess(result.user);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(t('auth.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
      setError('Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-100 d-flex flex-column justify-content-center">
      <div className="text-center mb-2">
        <h4 className={`mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
          {t('auth.login')}
        </h4>
        <p className={`mb-0 ${isDarkMode ? 'text-light' : 'text-muted'}`} style={{ fontSize: '0.8rem' }}>
          Welcome back! Please sign in to your account
        </p>
      </div>
      
      {error && (
        <div className="alert alert-danger py-1 mb-2" role="alert" style={{ fontSize: '0.75rem' }}>
          <small>{error}</small>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-2">
        <div className="mb-2">
          <label className={`form-label ${isDarkMode ? 'text-light' : 'text-dark'}`} style={{ fontSize: '0.8rem', marginBottom: '4px' }}>
            {t('auth.username')} *
          </label>
          <input
            type="text"
            className={`form-control form-control-sm ${isDarkMode ? 'bg-dark text-white border-secondary' : ''}`}
            placeholder={t('auth.username')}
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
        </div>

        <div className="mb-3">
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
            {loading ? t('common.loading') : t('auth.login')}
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
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
          style={{
            fontSize: '0.8rem',
            padding: '8px 16px',
            borderRadius: '20px',
            borderColor: isDarkMode ? '#404040' : '#dee2e6',
            color: isDarkMode ? '#f5f5f5' : '#495057',
            backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff'
          }}
        >
          <FaGoogle style={{ fontSize: '1rem' }} />
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="text-center">
        <p className={`mb-0 ${isDarkMode ? 'text-light' : 'text-muted'}`} style={{ fontSize: '0.75rem' }}>
          {t('auth.noAccount')}{' '}
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none"
            onClick={onSwitchToSignup}
            style={{ color: '#6050DC', fontSize: '0.75rem' }}
          >
            {t('auth.signup')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;