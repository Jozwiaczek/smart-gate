import Link from '@docusaurus/Link';
import React from 'react';

import heroStyles from '../HeroSection/HeroSection.module.css';
import ctaStyles from './CtaSection.module.css';

const CtaSection = () => (
  <div className={ctaStyles.ctaSection}>
    <img className={ctaStyles.ctaKeyIcon} src="/img/key-icon.svg" alt="asd" />
    <h2 className={ctaStyles.ctaTitle}>Deploy Smart Gate your own free</h2>
    <div className={ctaStyles.ctaButton}>
      <Link to="/docs/intro" className={heroStyles.heroBtn}>
        Get Started
      </Link>
    </div>
  </div>
);

export default CtaSection;
