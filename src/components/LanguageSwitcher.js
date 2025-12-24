import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <button className="language-switcher" onClick={toggleLanguage}>
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;
