import anime, { AnimeTimelineInstance } from 'animejs';
import React, { createRef, RefObject, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { LoaderBox, LoaderBoxItem, Wrapper } from './PageLoader.styled';

const PageLoader = () => {
  const animationRef = useRef<AnimeTimelineInstance>();
  const [targets, setTargets] = useState<Array<RefObject<HTMLDivElement>>>([]);

  const grid = useMemo(() => [17, 17], []);
  const col = grid[0];
  const row = grid[1];
  const numberOfBoxItems = col * row;

  const createBoxItems = useMemo(
    () =>
      [...Array.from(Array(numberOfBoxItems), (_, index) => index + 1)].map((key) => {
        const ref = createRef<HTMLDivElement>();
        setTargets((prev) => [...prev, ref]);
        return <LoaderBoxItem key={key} ref={ref} />;
      }),
    [numberOfBoxItems],
  );

  useLayoutEffect(() => {
    animationRef.current = anime
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
  }, [grid, targets]);

  return (
    <Wrapper data-testid="pageLoader">
      <LoaderBox>{createBoxItems}</LoaderBox>
    </Wrapper>
  );
};

PageLoader.displayName = 'PageLoader';

export default PageLoader;
