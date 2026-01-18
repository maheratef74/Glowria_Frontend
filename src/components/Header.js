import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';
import Logo from './Logo';
import './Header.css';

const Header = () => {
  const { language } = useContext(LanguageContext);
  const { getCartItemsCount } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const cartItemsCount = getCartItemsCount();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <div className="logo-image-wrapper">
              <Logo />
            </div>
          </Link>
          
          {/* Mobile Quick Actions - Always Visible */}
          <div className="mobile-quick-actions">
            <Link 
              to="/cart" 
              className="mobile-action-btn cart-link-mobile"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartItemsCount > 0 && (
                <span className="cart-badge-mobile">{cartItemsCount}</span>
              )}
            </Link>
            {isAuthenticated ? (
              <Link 
                to="/profile" 
                className="mobile-action-btn"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="mobile-action-btn"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
              </Link>
            )}
          </div>
          
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
                to="/cart" 
                className={`nav-link cart-link ${isActive('/cart') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {cartItemsCount > 0 && (
                  <span className="cart-badge">{cartItemsCount}</span>
                )}
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className={`nav-link auth-link ${isActive('/profile') ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {translations.nav.profile || 'Profile'}
                  </Link>
                  <button 
                    className="nav-link auth-link logout-btn"
                    onClick={handleLogout}
                  >
                    {translations.nav.logout || 'Logout'}
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`nav-link auth-link register-link ${isActive('/login') ? 'active' : ''}`}
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
                </>
              )}
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
