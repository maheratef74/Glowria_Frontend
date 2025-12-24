import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';
import Toast from '../components/Toast';
import './Auth.css';

const Login = () => {
  const { language } = useContext(LanguageContext);
  const { login } = useAuth();
  const navigate = useNavigate();
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addToast = (message, type = 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Basic validation
    if (!formData.email || !formData.password) {
      addToast(translations.login.errorRequired, 'error');
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData, language);
      
      if (result.success) {
        addToast(translations.login.successMessage, 'success');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        addToast(result.message || translations.login.errorLogin, 'error');
      }
    } catch (err) {
      addToast(err.message || translations.login.errorLogin, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <h1 className="auth-title">{translations.login.title}</h1>
            <p className="auth-subtitle">{translations.login.subtitle}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{translations.login.emailLabel}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder={translations.login.emailPlaceholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">{translations.login.passwordLabel}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
                placeholder={translations.login.passwordPlaceholder}
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? translations.login.loading || 'Loading...' : translations.login.submitButton}
            </button>

            <div className="auth-footer">
              <p>
                {translations.login.noAccount}{' '}
                <Link to="/register" className="auth-link">
                  {translations.login.registerLink}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
