import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';
import './Contact.css';

const Contact = () => {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert(translations.contact.successMessage);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-content">
          <div className="contact-header">
            <h1 className="page-title">{translations.contact.title}</h1>
            <p className="page-subtitle">{translations.contact.subtitle}</p>
          </div>

          <div className="contact-wrapper">
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">📧</div>
                <h3 className="info-title">{translations.contact.emailTitle}</h3>
                <p className="info-text">info@amirabeauty.com</p>
              </div>
              <div className="info-card">
                <div className="info-icon">📱</div>
                <h3 className="info-title">{translations.contact.phoneTitle}</h3>
                <p className="info-text">+1 (555) 123-4567</p>
              </div>
              <div className="info-card">
                <div className="info-icon">📍</div>
                <h3 className="info-title">{translations.contact.addressTitle}</h3>
                <p className="info-text">{translations.contact.addressText}</p>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{translations.contact.nameLabel}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{translations.contact.emailLabel}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">{translations.contact.messageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="form-textarea"
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                {translations.contact.submitButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
