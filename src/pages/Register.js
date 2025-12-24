import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';
import Toast from '../components/Toast';
import './Auth.css';

const fieldMap = {
  name: 'Name',
  email: 'Email',
  phoneNumber: 'PhoneNumber',
  address: 'Address',
  password: 'Password',
  confirmPassword: 'Confirmpassword'
};

const Register = () => {
  const { language } = useContext(LanguageContext);
  const { register } = useAuth();
  const navigate = useNavigate();
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorKey = fieldMap[name];
  
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  
    // Clear field-specific error immediately
    if (errorKey && fieldErrors[errorKey]) {
      setFieldErrors(prev => ({
        ...prev,
        [errorKey]: []
      }));
    }
  };

  const addToast = (message, type = 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  

  const validateForm = () => {
    const errors = {};
    let hasErrors = false;

    if (!formData.name.trim()) {
      errors.Name = [translations.register.errorNameRequired];
      hasErrors = true;
    }
    if (!formData.email.trim()) {
      errors.Email = [translations.register.errorEmailRequired];
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.Email = [translations.register.errorEmailInvalid || 'Invalid email format'];
      hasErrors = true;
    }
    if (!formData.phoneNumber.trim()) {
      errors.PhoneNumber = [translations.register.errorPhoneRequired];
      hasErrors = true;
    }
    if (!formData.address.trim()) {
      errors.Address = [translations.register.errorAddressRequired];
      hasErrors = true;
    }
    
    // Check if passwords match first
    if (!formData.password && !formData.confirmPassword) {
      errors.Password = [translations.register.errorPasswordRequired];
      hasErrors = true;
    } else if (formData.password !== formData.confirmPassword) {
      // Passwords don't match - only show this error
      errors.Confirmpassword = [translations.register.errorPasswordMatch];
      hasErrors = true;
    } else if (formData.password && formData.password.length < 6) {
      // Only check length if passwords match
      errors.Password = [translations.register.errorPasswordLength];
      hasErrors = true;
    }

    if (hasErrors) {
      setFieldErrors(errors);
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey && errors[firstErrorKey].length > 0) {
        addToast(errors[firstErrorKey][0], 'error');
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setLoading(true);
    
    // Custom validation with localized messages
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      }, language);
      
      if (result.success) {
        addToast(translations.register.successMessage, 'success');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        addToast(result.message || translations.register.errorRegister, 'error');
      }
    } catch (err) {
      // Handle validation errors with field-level messages
      if (err.type === 'validation' && err.errors) {
        setFieldErrors(err.errors);
        // Show first error as toast
        const firstErrorKey = Object.keys(err.errors)[0];
        if (firstErrorKey && err.errors[firstErrorKey].length > 0) {
          addToast(err.errors[firstErrorKey][0], 'error');
        }
      } else {
        // Show backend error message directly (will be in Arabic if Accept-Language header was ar)
        addToast(err.message || translations.register.errorRegister, 'error');
        setFieldErrors({});
      }
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
            <h1 className="auth-title">{translations.register.title}</h1>
            <p className="auth-subtitle">{translations.register.subtitle}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">{translations.register.nameLabel}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${fieldErrors.Name?.length > 0 ? 'error' : ''}`}
                placeholder={translations.register.namePlaceholder}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
              {fieldErrors.Name && fieldErrors.Name.length > 0 && (
                <div className="field-error">{fieldErrors.Name[0]}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">{translations.register.emailLabel}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${fieldErrors.Email && fieldErrors.Email.length > 0 ? 'error' : ''}`}
                placeholder={translations.register.emailPlaceholder}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
              {fieldErrors.Email && fieldErrors.Email.length > 0 && (
                <div className="field-error">{fieldErrors.Email[0]}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">{translations.register.phoneNumberLabel}</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`form-input ${fieldErrors.PhoneNumber && fieldErrors.PhoneNumber.length > 0 ? 'error' : ''}`}
                placeholder={translations.register.phoneNumberPlaceholder}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
              {fieldErrors.PhoneNumber && fieldErrors.PhoneNumber.length > 0 && (
                <div className="field-error">{fieldErrors.PhoneNumber[0]}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">{translations.register.addressLabel}</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`form-input ${fieldErrors.Address && fieldErrors.Address.length > 0 ? 'error' : ''}`}
                placeholder={translations.register.addressPlaceholder}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
              {fieldErrors.Address && fieldErrors.Address.length > 0 && (
                <div className="field-error">{fieldErrors.Address[0]}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">{translations.register.passwordLabel}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${fieldErrors.Password && fieldErrors.Password.length > 0 ? 'error' : ''}`}
                placeholder={translations.register.passwordPlaceholder}
              />
              {fieldErrors.Password && fieldErrors.Password.length > 0 && (
                <div className="field-error">{fieldErrors.Password[0]}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">{translations.register.confirmPasswordLabel}</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input ${fieldErrors.Confirmpassword && fieldErrors.Confirmpassword.length > 0 ? 'error' : ''}`}
                placeholder={translations.register.confirmPasswordPlaceholder}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
              {fieldErrors.Confirmpassword && fieldErrors.Confirmpassword.length > 0 && (
                <div className="field-error">{fieldErrors.Confirmpassword[0]}</div>
              )}
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? translations.register.loading || 'Loading...' : translations.register.submitButton}
            </button>

            <div className="auth-footer">
              <p>
                {translations.register.haveAccount}{' '}
                <Link to="/login" className="auth-link">
                  {translations.register.loginLink}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;