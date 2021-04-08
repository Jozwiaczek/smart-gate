import React, {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useCurrentUser } from '../../../../hooks';
import { ArrowIcon } from '../../../../icons';
import { IconButton } from '../../../buttons';
import { TabProps } from '../Tab/Tab.types';
import {
  ScrollButtonWrapper,
  ScrollIconWrapper,
  TabsIndicator,
  TabsRoot,
  TabsWrapper,
} from './Tabs.styled';
import { DisplayScroll, IndicatorSize, OnChange, TabsProps } from './Tabs.types';
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
  const itemsRef = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.splice(0, Children.count(children));
  }, [children]);

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

  const onScroll = useCallback(() => {
    const tabsWrapperNode = tabsWrapperRef.current;
    if (!tabsWrapperNode) {
      return;
    }
    const { clientWidth, clientHeight, scrollWidth, scrollTop, scrollHeight } = tabsWrapperNode;

    let showStartScroll: boolean;
    let showEndScroll: boolean;

    if (orientation === 'horizontal') {
      showStartScroll = tabsWrapperNode.scrollLeft > 1;
      showEndScroll = tabsWrapperNode.scrollLeft < scrollWidth - clientWidth - 1;
    } else {
      showStartScroll = scrollTop > 1;
      showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
    }

    if (showStartScroll !== displayScroll.start || showEndScroll !== displayScroll.end) {
      setDisplayScroll({
        start: showStartScroll,
        end: showEndScroll,
      });
    }
  }, [displayScroll.end, displayScroll.start, orientation]);

  useEffect(() => {
    if (variant === 'scrollable') {
      onScroll();
    }
  }, [onScroll, variant]);

  const onTabSelect: OnChange = (event, newValue) => {
    if (newValue < 0 || newValue > Children.count(children) - 1) {
      return;
    }

    onChange(event, newValue);
    if (variant === 'scrollable') {
      itemsRef.current[newValue]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };

  return (
    <TabsRoot>
      {displayScroll.start && (
        <ScrollButtonWrapper
          displayType="start"
          orientation={orientation}
          onClick={(event) => {
            onTabSelect(event, value - 1);
          }}
        >
          <ScrollIconWrapper orientation={orientation} displayType="start">
            <IconButton size={50}>
              <ArrowIcon />
            </IconButton>
          </ScrollIconWrapper>
        </ScrollButtonWrapper>
      )}
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
              onChange: onTabSelect,
              index,
              variant,
              orientation,
              tabWidth,
              tabHeight,
            };

            return cloneElement(child, {
              ...tabInjectProps,
              ref: (node: HTMLButtonElement) => {
                itemsRef.current[index] = node;
              },
            });
          }

          return child;
        })}
      </TabsWrapper>
      {displayScroll.end && (
        <ScrollButtonWrapper
          displayType="end"
          orientation={orientation}
          onClick={(event) => {
            onTabSelect(event, value + 1);
          }}
        >
          <ScrollIconWrapper orientation={orientation} displayType="end">
            <IconButton size={50}>
              <ArrowIcon />
            </IconButton>
          </ScrollIconWrapper>
        </ScrollButtonWrapper>
      )}
    </TabsRoot>
  );
};

export default Tabs;
