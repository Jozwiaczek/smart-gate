import anime from 'animejs';
import React, { createRef, RefObject, useLayoutEffect, useMemo, useState } from 'react';

import { useMediaDevice } from '../../../hooks';
import {
  LoaderBox,
  LoaderBoxItem,
  LoadingLabel,
  LoadingLetter,
  Wrapper,
} from './PageLoader.styled';
import { PageLoaderProps } from './PageLoader.types';

const PageLoader = ({ size }: PageLoaderProps) => {
  const [targets, setTargets] = useState<Array<RefObject<HTMLDivElement>>>([]);
  const [loadingTargets, setLoadingTargets] = useState<Array<RefObject<HTMLSpanElement>>>([]);
  const { isMobile } = useMediaDevice();
  const LOADING_LABEL = 'Loading';

  let sizeInternal = isMobile ? 10 : 20;
  if (size) {
    sizeInternal = size;
  }
  const grid = useMemo(() => [sizeInternal, sizeInternal], [sizeInternal]);
  const numberOfBoxItems = sizeInternal ** 2;

  const createBoxItems = useMemo(
    () =>
      [...Array.from(Array(numberOfBoxItems), (_, index) => index + 1)].map((key) => {
        const ref = createRef<HTMLDivElement>();
        setTargets((prev) => [...prev, ref]);
        return <LoaderBoxItem key={key} ref={ref} />;
      }),
    [numberOfBoxItems],
  );

  const createLoadingLetters = useMemo(
    () =>
      [...LOADING_LABEL.split('')].map((letter) => {
        const ref = createRef<HTMLSpanElement>();
        setLoadingTargets((prev) => [...prev, ref]);
        return (
          <LoadingLetter key={letter} ref={ref}>
            {letter}
          </LoadingLetter>
        );
      }),
    [],
  );

  const isMountedRefs = <T extends RefObject<HTMLElement>>(arr: Array<T>) =>
    arr.every((el: T) => !!el.current);

  useLayoutEffect(() => {
    if (isMountedRefs(targets)) {
      anime
        .timeline({
          targets: targets.map((boxItem) => boxItem.current),
          easing: 'easeInOutSine',
          delay: anime.stagger(50),
          loop: true,
        })
        .add({
          translateX: [
            { value: anime.stagger('-.1rem', { grid, from: 'center', axis: 'x' }) },
            { value: anime.stagger('.1rem', { grid, from: 'center', axis: 'x' }) },
          ],
          translateY: [
            { value: anime.stagger('-.1rem', { grid, from: 'center', axis: 'y' }) },
            { value: anime.stagger('.1rem', { grid, from: 'center', axis: 'y' }) },
          ],
          duration: 1000,
          scale: 0.5,
          delay: anime.stagger(100, { grid, from: 'center' }),
        })
        .add({
          translateX: anime.stagger('.25rem', { grid, from: 'center', axis: 'x' }),
          translateY: anime.stagger('.25rem', { grid, from: 'center', axis: 'y' }),
          rotate: 0,
          scaleX: 2.5,
          scaleY: 0.25,
          delay: anime.stagger(4, { from: 'center' }),
        })
        .add({
          rotate: anime.stagger([90, 0], { grid, from: 'center' }),
          delay: anime.stagger(50, { grid, from: 'center' }),
        })
        .add({
          translateX: 0,
          translateY: 0,
          scale: 0.5,
          scaleX: 1,
          rotate: 180,
          duration: 1000,
          delay: anime.stagger(100, { grid, from: 'center' }),
        })
        .add({
          scaleY: 1,
          scale: 1,
          delay: anime.stagger(20, { grid, from: 'center' }),
        });
    }
  }, [grid, targets]);

  useLayoutEffect(() => {
    if (isMountedRefs(loadingTargets)) {
      anime({
        targets: loadingTargets.map((boxItem) => boxItem.current),
        scale: [0, 1],
        opacity: 1,
        duration: 2000,
        elasticity: 600,
        delay: (el, i) => 45 * (i + 1) + 500,
      });
    }
  }, [loadingTargets]);

  return (
    <Wrapper data-testid="pageLoader">
      <LoaderBox size={sizeInternal}>{createBoxItems}</LoaderBox>
      <LoadingLabel>{createLoadingLetters}</LoadingLabel>
    </Wrapper>
  );
};

PageLoader.displayName = 'PageLoader';

export default PageLoader;
