import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CtaSection from '@site/src/components/CtaSection';
import FeatureSection from '@site/src/components/FeatureSection';
import HeroSection from '@site/src/components/HeroSection';
import { features } from '@site/src/data/features';
import { useGithubStars } from '@site/src/hooks/useGithubStars';
import Layout from '@theme/Layout';
import React from 'react';

import styles from './index.module.css';

const Home = (): JSX.Element => {
  const { siteConfig } = useDocusaurusContext();
  useGithubStars();

  return (
    <Layout description={siteConfig.tagline}>
      <main className={styles.mainContainer}>
        <HeroSection />
        {features.map(({ title, description, imgSrc, imgAlt, imgSize }, index) => (
          <FeatureSection
            key={title}
            title={title}
            description={description}
            imgSrc={imgSrc}
            imgAlt={imgAlt}
            isOdd={index % 2 !== 0}
            imgSize={imgSize}
          />
        ))}
        <CtaSection />
      </main>
    </Layout>
  );
};

export default Home;
