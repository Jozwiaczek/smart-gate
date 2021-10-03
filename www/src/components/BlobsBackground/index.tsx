import ShowInViewport from '@site/src/components/ShowInViewport';
import clsx from 'clsx';
import React, { ReactElement } from 'react';

import styles from './BlobsBackground.module.css';

const BlobsBackground = ({ children }: { children: ReactElement }) => (
  <div className={styles.container}>
    <div className={styles.contentContainer}>
      <ShowInViewport>{children}</ShowInViewport>
    </div>
    <div className={styles.blobsContainer}>
      {Array.from({ length: 6 }, (_, i) => i + 1).map((blobId) => (
        <img
          key={`blob-${blobId.toString()}`}
          className={clsx(styles[`blob${blobId}`], styles.blob)}
          src={`img/blobs/blob${blobId}.png`}
          alt="Smart Gate Blob"
        />
      ))}
    </div>
  </div>
);

export default BlobsBackground;
