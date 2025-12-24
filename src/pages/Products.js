import React, { useState, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { LanguageContext } from '../context/LanguageContext';
import { products } from '../data/products';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';
import { productTranslations } from '../translations/en';
import { productTranslations as arProductTranslations } from '../translations/ar';
import './Products.css';

const Products = () => {
  const { language } = useContext(LanguageContext);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const translations = language === 'ar' ? arTranslations : enTranslations;
  const productTexts = language === 'ar' ? arProductTranslations.ar : productTranslations.en;

  const categories = ['all', 'skincare', 'haircare'];

  // Merge product data with translations
  const productsWithTranslations = products.map(product => {
    const translatedProduct = productTexts.find(p => p.id === product.id);
    return {
      ...product,
      name: translatedProduct ? translatedProduct.name : product.name,
      description: translatedProduct ? translatedProduct.description : product.description
    };
  });

  const filteredProducts = selectedCategory === 'all'
    ? productsWithTranslations
    : productsWithTranslations.filter(product => product.category === selectedCategory);

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">{translations.products.title}</h1>
          <p className="page-subtitle">{translations.products.subtitle}</p>
        </div>

        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {translations.categories[category]}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
