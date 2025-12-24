import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';
import './About.css';

const About = () => {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-content">
          <div className="about-header">
            <h1 className="page-title">{translations.about.title}</h1>
            <p className="page-subtitle">{translations.about.subtitle}</p>
          </div>

          <div className="about-sections">
            <section className="about-section">
              <div className="section-icon">✨</div>
              <h2 className="section-title">{translations.about.missionTitle}</h2>
              <p className="section-text">{translations.about.missionText}</p>
            </section>

            <section className="about-section">
              <div className="section-icon">🌿</div>
              <h2 className="section-title">{translations.about.valuesTitle}</h2>
              <p className="section-text">{translations.about.valuesText}</p>
            </section>

            <section className="about-section">
              <div className="section-icon">💖</div>
              <h2 className="section-title">{translations.about.qualityTitle}</h2>
              <p className="section-text">{translations.about.qualityText}</p>
            </section>
          </div>

          <div className="about-story">
            <h2 className="story-title">{translations.about.storyTitle}</h2>
            <p className="story-text">{translations.about.storyText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
