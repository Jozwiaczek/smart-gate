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
import { IndicatorSize, TabsProps } from './Tabs.types';
import { countAvailableChildren, getIndicatorLeft, getIndicatorSize } from './Tabs.utils';

const Tabs = ({ children, onChange, value, options = {} }: TabsProps) => {
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [currentUser] = useCurrentUser();
  const [indicatorSize, setIndicatorSize] = useState<IndicatorSize>({ width: 0, height: 0 });

  const {
    tabWidth = 160,
    indicatorThin = 5,
    variant = 'default',
    orientation = 'horizontal',
    indicatorPosition,
    indicatorWidth,
    indicatorHeight,
  } = options;

  const internalIndicatorPosition =
    indicatorPosition || (orientation === 'horizontal' ? 'bottom' : 'left');
  console.log('L:34 | indicatorPosition: ', indicatorPosition);

  useLayoutEffect(() => {
    const tabbedContainerWidth = tabsWrapperRef.current?.offsetWidth || 0;
    const totalChildren = countAvailableChildren(children, currentUser);
    const tabWidthOnFullWidth = tabbedContainerWidth / totalChildren;
    const internalTabWidth = variant === 'fullWidth' ? tabWidthOnFullWidth : tabWidth;

    const internalIndicatorSize = getIndicatorSize({
      defaultThin: indicatorThin,
      tabSize: internalTabWidth,
      width: indicatorWidth,
      height: indicatorHeight,
      orientation,
    });
    setIndicatorSize(internalIndicatorSize);

    setIndicatorLeft(
      getIndicatorLeft({
        value,
        totalChildren,
        containerWidth: tabbedContainerWidth,
        tabWidth: internalTabWidth,
        indicatorWidth: internalIndicatorSize.width,
        variant,
      }),
    );
  }, [
    children,
    currentUser,
    indicatorHeight,
    indicatorThin,
    indicatorWidth,
    orientation,
    tabWidth,
    value,
    variant,
  ]);

  return (
    <TabsWrapper ref={tabsWrapperRef} variant={variant} orientation={orientation}>
      <TabsIndicator
        left={indicatorLeft}
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
            tabWidth,
          };

          return cloneElement(child, tabInjectProps);
        }

        return child;
      })}
    </TabsWrapper>
  );
};

export default Tabs;
