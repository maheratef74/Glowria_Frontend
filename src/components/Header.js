import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';
import './Header.css';

const Header = () => {
  const { language } = useContext(LanguageContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const translations = language === 'ar' ? arTranslations : enTranslations;

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <img 
              src="/images/glowria-logo.png" 
              alt="Glowria" 
              className="logo-image"
            />
            <h1 className="logo">{translations.header.title}</h1>
          </Link>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {translations.nav.home}
            </Link>
            <Link 
              to="/products" 
              className={`nav-link ${isActive('/products') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {translations.nav.products}
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {translations.nav.about}
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {translations.nav.contact}
            </Link>
            <div className="nav-auth">
              <Link 
                to="/login" 
                className={`nav-link auth-link ${isActive('/login') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.login}
              </Link>
              <Link 
                to="/register" 
                className={`nav-link auth-link register-link ${isActive('/register') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.register}
              </Link>
            </div>
          </nav>

          <button 
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
