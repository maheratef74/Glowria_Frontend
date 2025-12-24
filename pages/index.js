import React, { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations as enTranslations } from '../translations/en';
import { translations as arTranslations } from '../translations/ar';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{translations.home.heroTitle}</h1>
            <p className={styles.heroSubtitle}>{translations.home.heroSubtitle}</p>
            <Link href="/products" className={styles.ctaButton}>
              {translations.home.ctaButton}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{translations.home.featuresTitle}</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✨</div>
              <h3 className={styles.featureTitle}>{translations.home.feature1Title}</h3>
              <p className={styles.featureDescription}>{translations.home.feature1Desc}</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌿</div>
              <h3 className={styles.featureTitle}>{translations.home.feature2Title}</h3>
              <p className={styles.featureDescription}>{translations.home.feature2Desc}</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💖</div>
              <h3 className={styles.featureTitle}>{translations.home.feature3Title}</h3>
              <p className={styles.featureDescription}>{translations.home.feature3Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
