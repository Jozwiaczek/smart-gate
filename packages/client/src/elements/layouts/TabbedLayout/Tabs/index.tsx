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
import { TabsProps } from './Tabs.types';
import { countAvailableChildren, getIndicatorPosition } from './Tabs.utils';

const Tabs = ({ children, onChange, value, options = {} }: TabsProps) => {
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [currentUser] = useCurrentUser();
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  const {
    indicatorPosition = 'bottom',
    tabWidth = 160,
    indicatorWidth: tabIndicatorWidthProp,
    variant = 'default',
  } = options;

  useLayoutEffect(() => {
    const tabbedContainerWidth = tabsWrapperRef.current?.offsetWidth || 0;
    const totalsChildren = countAvailableChildren(children, currentUser);
    const tabWidthOnFullWidth = tabbedContainerWidth / totalsChildren;

    const internalIndicatorWidth =
      variant === 'fullWidth'
        ? tabIndicatorWidthProp || tabWidthOnFullWidth
        : tabIndicatorWidthProp || tabWidth;
    const internalTabWidth = variant === 'fullWidth' ? tabWidthOnFullWidth : tabWidth;

    setIndicatorLeft(
      getIndicatorPosition(
        value,
        totalsChildren,
        tabbedContainerWidth,
        internalTabWidth,
        internalIndicatorWidth,
        variant,
      ),
    );

    setIndicatorWidth(internalIndicatorWidth);
  }, [children, currentUser, tabIndicatorWidthProp, tabWidth, value, variant]);

  return (
    <TabsWrapper ref={tabsWrapperRef} variant={variant}>
      <TabsIndicator left={indicatorLeft} position={indicatorPosition} width={indicatorWidth} />
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
