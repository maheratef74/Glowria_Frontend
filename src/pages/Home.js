import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';
import './Home.css';

const Home = () => {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{translations.home.heroTitle}</h1>
            <p className="hero-subtitle">{translations.home.heroSubtitle}</p>
            <Link to="/products" className="cta-button">
              {translations.home.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">{translations.home.featuresTitle}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3 className="feature-title">{translations.home.feature1Title}</h3>
              <p className="feature-description">{translations.home.feature1Desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3 className="feature-title">{translations.home.feature2Title}</h3>
              <p className="feature-description">{translations.home.feature2Desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💖</div>
              <h3 className="feature-title">{translations.home.feature3Title}</h3>
              <p className="feature-description">{translations.home.feature3Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
