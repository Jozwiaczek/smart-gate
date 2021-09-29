import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlobsBackground from '@site/src/components/BlobsBackground';
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
        <BlobsBackground>
          <section className={styles.heroContainer}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleHighlight}>Smart</span> Gate
            </h1>
            <p className={styles.heroDescription}>{siteConfig.tagline}</p>
            <div className={styles.heroBtnContainer}>
              <Link to="/docs/intro" className={styles.heroBtn}>
                Get Started
              </Link>
            </div>
          </section>
        </BlobsBackground>
        {features.map(({ title, description, imgSrc, imgAlt }, index) => (
          <section
            key={title}
            className={styles.featureSection}
            style={index % 2 !== 0 ? { flexDirection: 'row-reverse', textAlign: 'right' } : {}}
          >
            <div
              className={styles.featureTextContainer}
              style={index % 2 !== 0 ? { alignItems: 'flex-end' } : {}}
            >
              <h2 className={styles.featureTitle}>{title}</h2>
              <div className={styles.featureDescription}>{description}</div>
            </div>
            <img className={styles.featureImage} alt={imgAlt} src={imgSrc} />
          </section>
        ))}
      </main>
    </Layout>
  );
};

export default Home;
