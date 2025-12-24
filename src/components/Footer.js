import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';
import './Footer.css';

const Footer = () => {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;

  return (
    <footer className="footer">
      <div className="container">
        <p>{translations.footer.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
