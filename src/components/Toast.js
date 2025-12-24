import React, { useEffect, useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const Toast = ({ message, type = 'error', onClose, duration = 4000 }) => {
  const { language } = useContext(LanguageContext);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRemoving(true);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTitle = () => {
    if (type === 'error') {
      return language === 'ar' ? '❌ خطأ' : '❌ Error';
    }
    return language === 'ar' ? '✅ نجاح' : '✅ Success';
  };

  return (
    <div className={`toast ${type} ${isRemoving ? 'removing' : ''}`}>
      <div className="toast-content">
        <div className="toast-title">{getTitle()}</div>
        <div className="toast-message">{message}</div>
      </div>
      <button className="toast-close" onClick={() => {
        setIsRemoving(true);
        setTimeout(onClose, 300);
      }}>
        ✕
      </button>
    </div>
  );
};

export default Toast;
