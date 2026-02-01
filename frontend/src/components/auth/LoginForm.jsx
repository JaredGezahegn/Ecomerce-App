import { useState } from 'react';
import { useLang } from '../../context/LangContext';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ onSuccess, onSwitchToSignup }) => {
  const { t } = useLang();
  const { login } = useAuth();
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
        onSuccess && onSuccess(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(t('auth.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-lg">
      <div className="card-body p-4">
        <h3 className="card-title text-center mb-4">{t('auth.login')}</h3>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              {t('auth.username')}
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              {t('auth.password')}
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={loading}
            style={{ backgroundColor: '#6050DC', borderColor: '#6050DC' }}
          >
            {loading ? t('common.loading') : t('auth.login')}
          </button>
        </form>

        <div className="text-center">
          <p className="mb-0">
            {t('auth.noAccount')}{' '}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={onSwitchToSignup}
            >
              {t('auth.signup')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;