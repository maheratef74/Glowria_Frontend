import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';
import './Cart.css';

const Cart = () => {
  const { language } = useContext(LanguageContext);
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const translations = language === 'ar' ? arTranslations : enTranslations;

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity) || 1);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <div className="empty-cart-icon">🛒</div>
            <h2 className="empty-cart-title">{translations.cart.emptyTitle}</h2>
            <p className="empty-cart-message">{translations.cart.emptyMessage}</p>
            <Link to="/products" className="continue-shopping-btn">
              {translations.cart.continueShopping}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">{translations.cart.title}</h1>
          <button className="clear-cart-btn" onClick={clearCart}>
            {translations.cart.clearCart}
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <div className="image-placeholder">
                    <span className="product-icon">
                      {item.category === 'skincare' ? '✨' : '💇‍♀️'}
                    </span>
                  </div>
                </div>
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-description">{item.description}</p>
                  <div className="cart-item-meta">
                    <span className="cart-item-size">{item.size}</span>
                    <span className="cart-item-price">${item.price}</span>
                  </div>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      min="1"
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className="remove-item-btn"
                    onClick={() => handleRemove(item.id)}
                    aria-label="Remove item"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h2 className="summary-title">{translations.cart.summary}</h2>
              <div className="summary-row">
                <span>{translations.cart.subtotal}</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>{translations.cart.shipping}</span>
                <span>{translations.cart.freeShipping || 'Free'}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total-row">
                <span>{translations.cart.total}</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <button className="checkout-btn">
                {translations.cart.checkout}
              </button>
              <Link to="/products" className="continue-shopping-link">
                {translations.cart.continueShopping}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

