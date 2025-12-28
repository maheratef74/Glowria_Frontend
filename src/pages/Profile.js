import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';
import './Profile.css';

const Profile = () => {
  const { language } = useContext(LanguageContext);
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // If authenticated, fetch orders
    // TODO: Fetch user orders from API
    // For now, using mock data
    setTimeout(() => {
      setOrders([
        {
          id: 1,
          orderNumber: 'ORD-2024-001',
          date: '2024-01-15',
          status: 'Delivered',
          total: 89.97,
          items: [
            { name: 'Glowing Face Serum', quantity: 1, price: 29.99 },
            { name: 'Hydrating Face Cream', quantity: 2, price: 24.99 }
          ]
        },
        {
          id: 2,
          orderNumber: 'ORD-2024-002',
          date: '2024-01-20',
          status: 'Processing',
          total: 45.98,
          items: [
            { name: 'Nourishing Shampoo', quantity: 2, price: 16.99 },
            { name: 'Deep Conditioner', quantity: 1, price: 18.99 }
          ]
        }
      ]);
      setLoading(false);
    }, 500);
  }, [isAuthenticated, authLoading, navigate]);

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading-state" style={{ textAlign: 'center', padding: '3rem' }}>
            <p>{translations.profile.loading || 'Loading...'}</p>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, show message and redirect
  if (!isAuthenticated) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading-state" style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  // If user data not loaded yet, show loading
  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading-state" style={{ textAlign: 'center', padding: '3rem' }}>
            <p>{translations.profile.loading || 'Loading user data...'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1 className="profile-title">{translations.profile.title}</h1>
          <p className="profile-subtitle">{translations.profile.welcome} {user.name}</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-avatar">
                <span className="avatar-icon">👤</span>
              </div>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-email">{user.email}</p>
              {user.phoneNumber && (
                <p className="profile-phone">{user.phoneNumber}</p>
              )}
              {user.address && (
                <p className="profile-address">{user.address}</p>
              )}
            </div>
          </div>

          <div className="profile-main">
            <div className="orders-section">
              <h2 className="section-title">{translations.profile.orders}</h2>
              
              {loading ? (
                <div className="loading-state">
                  <p>{translations.profile.loading || 'Loading...'}</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="empty-orders">
                  <div className="empty-icon">📦</div>
                  <p className="empty-message">{translations.profile.noOrders}</p>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-info">
                          <h3 className="order-number">{translations.profile.orderNumber}: {order.orderNumber}</h3>
                          <p className="order-date">{translations.profile.orderDate}: {new Date(order.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}</p>
                        </div>
                        <div className="order-status-wrapper">
                          <span className={`order-status ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                          <span className="order-total">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="order-items">
                        <h4 className="order-items-title">{translations.profile.items}:</h4>
                        <ul className="items-list">
                          {order.items.map((item, index) => (
                            <li key={index} className="order-item">
                              <span className="item-name">{item.name}</span>
                              <span className="item-quantity">x{item.quantity}</span>
                              <span className="item-price">${item.price.toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

