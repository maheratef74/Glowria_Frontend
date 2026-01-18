import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { productTranslations } from '../translations/en';
import { productTranslations as arProductTranslations } from '../translations/ar';
import './Home.css';

const Home = () => {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleProducts, setVisibleProducts] = useState(6);

  const productTexts = language === 'ar' ? arProductTranslations.ar : productTranslations.en;

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

  const displayedProducts = filteredProducts.slice(0, visibleProducts);
  const hasMore = filteredProducts.length > visibleProducts;

  const categories = ['all', 'skincare', 'haircare'];

  return (
    <div className="home-page">
      {/* Products Section - Now First */}
      <section className="products-section">
        <div className="container">
          <div className="section-header fade-in-up">
            <h1 className="section-title">{translations.home.heroTitle}</h1>
            <p className="section-subtitle">{translations.home.heroSubtitle}</p>
          </div>

          <div className="category-filter fade-in-up" style={{ animationDelay: '0.1s' }}>
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
            {displayedProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="product-card-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="load-more-container fade-in-up">
              <button 
                className="load-more-btn"
                onClick={() => setVisibleProducts(prev => prev + 6)}
              >
                {translations.home.loadMore || 'Load More'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Tech Features Section */}
      <section className="tech-features">
        <div className="container">
          <div className="tech-header fade-in-up">
            <div className="tech-icon-wrapper">
              <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2 className="section-title tech-title">{translations.home.featuresTitle}</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card tech-card fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="feature-icon tech-icon-gold">✨</div>
              <h3 className="feature-title">{translations.home.feature1Title}</h3>
              <p className="feature-description">{translations.home.feature1Desc}</p>
              <div className="tech-accent"></div>
            </div>
            <div className="feature-card tech-card fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="feature-icon tech-icon-gold">🌿</div>
              <h3 className="feature-title">{translations.home.feature2Title}</h3>
              <p className="feature-description">{translations.home.feature2Desc}</p>
              <div className="tech-accent"></div>
            </div>
            <div className="feature-card tech-card fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="feature-icon tech-icon-gold">💖</div>
              <h3 className="feature-title">{translations.home.feature3Title}</h3>
              <p className="feature-description">{translations.home.feature3Desc}</p>
              <div className="tech-accent"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
