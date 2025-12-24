import React, { useContext } from 'react';
import './ProductCard.css';
import { LanguageContext } from '../context/LanguageContext';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';

const ProductCard = ({ product }) => {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;

  return (
    <div className="product-card">
      <div className="product-image">
        <div className="product-category-badge">
          {language === 'ar' 
            ? (product.category === 'skincare' ? 'العناية بالبشرة' : 'العناية بالشعر')
            : (product.category === 'skincare' ? 'Skincare' : 'Haircare')
          }
        </div>
        <div className="image-placeholder">
          <span className="product-icon">
            {product.category === 'skincare' ? '✨' : '💇‍♀️'}
          </span>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <span className="product-price">${product.price}</span>
          <span className="product-size">{product.size}</span>
        </div>
        <button className="add-to-cart-btn">{translations.product.addToCart}</button>
      </div>
    </div>
  );
};

export default ProductCard;
