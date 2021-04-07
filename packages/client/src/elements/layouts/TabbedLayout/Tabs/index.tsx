import React, {
  Children,
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useCurrentUser } from '../../../../hooks';
import { TabProps } from '../Tab/Tab.types';
import { TabsIndicator, TabsWrapper } from './Tabs.styled';
import { DisplayScroll, IndicatorSize, TabsProps } from './Tabs.types';
import { countAvailableChildren, getIndicatorAnimationSpace, getIndicatorSize } from './Tabs.utils';

const Tabs = ({ children, onChange, value, options = {} }: TabsProps) => {
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const [indicatorAnimationSpace, setIndicatorAnimationSpace] = useState(0);
  const [currentUser] = useCurrentUser();
  const [indicatorSize, setIndicatorSize] = useState<IndicatorSize>({ width: 0, height: 0 });
  const [displayScroll, setDisplayScroll] = useState<DisplayScroll>({
    start: false,
    end: false,
  });

  console.log('display scroll', displayScroll.start, displayScroll.end);

  const {
    tabWidth = 160,
    tabHeight = 160,
    indicatorThin = 5,
    variant = 'default',
    orientation = 'horizontal',
    indicatorPosition,
    indicatorWidth,
    indicatorHeight,
  } = options;

  const internalIndicatorPosition =
    indicatorPosition || (orientation === 'horizontal' ? 'bottom' : 'left');

  useLayoutEffect(() => {
    const totalChildren = countAvailableChildren(children, currentUser);

    const tabsWrapperNode = tabsWrapperRef.current;
    if (!tabsWrapperNode) {
      return;
    }
    const { offsetWidth: containerWidth, offsetHeight: containerHeight } = tabsWrapperNode;

    const containerSize = orientation === 'vertical' ? containerHeight : containerWidth;

    const tabSizeOnFullWidth = containerSize / totalChildren;
    const tabSize = orientation === 'vertical' ? tabHeight : tabWidth;
    const internalTabSize = variant === 'fullWidth' ? tabSizeOnFullWidth : tabSize;

    const internalIndicatorSize = getIndicatorSize({
      defaultThin: indicatorThin,
      tabSize: internalTabSize,
      width: indicatorWidth,
      height: indicatorHeight,
      orientation,
    });
    setIndicatorSize(internalIndicatorSize);

    const animationSpace = getIndicatorAnimationSpace({
      value,
      totalChildren,
      containerSize,
      tabSize: internalTabSize,
      indicatorSize:
        orientation === 'vertical' ? internalIndicatorSize.height : internalIndicatorSize.width,
      variant,
    });

    setIndicatorAnimationSpace(animationSpace);
  }, [
    children,
    currentUser,
    displayScroll.end,
    displayScroll.start,
    indicatorHeight,
    indicatorThin,
    indicatorWidth,
    orientation,
    tabHeight,
    tabWidth,
    value,
    variant,
  ]);

  const onScroll = () => {
    const tabsWrapperNode = tabsWrapperRef.current;
    if (!tabsWrapperNode) {
      return;
    }
    const { clientWidth, scrollWidth } = tabsWrapperNode;

    const showStartScroll = tabsWrapperNode.scrollLeft > 1;
    const showEndScroll = tabsWrapperNode.scrollLeft < scrollWidth - clientWidth - 1;

    if (showStartScroll !== displayScroll.start || showEndScroll !== displayScroll.end) {
      setDisplayScroll({
        start: showStartScroll,
        end: showEndScroll,
      });
    }
  };

  return (
    <TabsWrapper
      ref={tabsWrapperRef}
      variant={variant}
      orientation={orientation}
      onScroll={() => onScroll()}
    >
      <TabsIndicator
        orientation={orientation}
        animationSpace={indicatorAnimationSpace}
        position={internalIndicatorPosition}
        width={indicatorSize.width}
        height={indicatorSize.height}
      />
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          const tabInjectProps: TabProps = {
            ...child.props,
            value,
            onChange,
            index,
            variant,
            orientation,
            tabWidth,
            tabHeight,
          };

          return cloneElement(child, tabInjectProps);
        }

        return child;
      })}
    </TabsWrapper>
  );
};

export default Tabs;
