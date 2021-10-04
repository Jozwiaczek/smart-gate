import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ShowInViewport from '@site/src/components/ShowInViewport';
import React from 'react';

import SgLogo from './bg-sg-logo.svg';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <section className={styles.heroContainer}>
      <SgLogo className={styles.backgroundLogo} />
      <ShowInViewport>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleHighlight}>Smart</span> Gate
        </h1>
        <p className={styles.heroDescription}>{siteConfig.tagline}</p>
        <div className={styles.heroBtnContainer}>
          <Link to="/docs/intro" className={styles.heroBtn}>
            Get Started
          </Link>
        </div>
      </ShowInViewport>
    </section>
  );
};

export default HeroSection;
