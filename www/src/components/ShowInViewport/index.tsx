import React, { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './ShowInViewport.module.css';

interface ShowInViewportProps {
  children: ReactNode;
  triggerOnce?: boolean;
  threshold?: number;
}

const ShowInViewport = ({ children, threshold = 0.3, triggerOnce = true }: ShowInViewportProps) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  return (
    <div ref={ref} className={inView ? styles.visible : styles.hidden}>
      {children}
    </div>
  );
};

export default ShowInViewport;
