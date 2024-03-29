import ShowInViewport from '@site/src/components/ShowInViewport';
import { FeatureSectionImageSize, FeatureSectionProps } from '@site/src/data/features';
import React from 'react';

import styles from './FeatureSection.module.css';

const getImgSize = (size: FeatureSectionImageSize) => {
  switch (size) {
    case 'large':
      return styles.featureImageLarge;
    case 'small':
      return styles.featureImageSmall;
    default:
      return styles.featureImageNormal;
  }
};

const FeatureSection = ({
  title,
  description,
  imgSrc,
  imgAlt,
  isOdd,
  imgSize = 'normal',
}: FeatureSectionProps) => (
  <ShowInViewport>
    <section
      className={styles.featureSection}
      style={isOdd ? { flexDirection: 'row-reverse', textAlign: 'right' } : {}}
    >
      <div className={styles.featureTextContainer} style={isOdd ? { alignItems: 'flex-end' } : {}}>
        <h2 className={styles.featureTitle}>{title}</h2>
        <div className={styles.featureDescription}>{description}</div>
      </div>
      <img className={getImgSize(imgSize)} alt={imgAlt} src={imgSrc} />
    </section>
  </ShowInViewport>
);

export default FeatureSection;
