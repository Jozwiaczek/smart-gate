import React, {
  Children,
  cloneElement,
  isValidElement,
  MouseEvent,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { useCurrentUser } from '../../../hooks';
import { RippleEffect } from '../../animations';
import {
  TabButton,
  TabLabel,
  TabPanelWrapper,
  TabsIndicator,
  TabsWrapper,
} from './TabbedLayout.styled';
import { TabPanelProps, TabProps, TabsProps } from './TabbedLayout.types';
import { countAvailableChildren, getIndicatorPosition, hasAccess } from './TabbedLayout.utils';

const Tabs = ({ children, onChange, value, options = {} }: TabsProps) => {
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [currentUser] = useCurrentUser();
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  const {
    tabIndicatorPosition = 'bottom',
    tabWidth = 160,
    tabIndicatorWidth: tabIndicatorWidthProp = tabWidth,
    variant = 'default',
  } = options;

  useLayoutEffect(() => {
    const tabbedContainerWidth = tabsWrapperRef.current?.offsetWidth || 0;
    const totalsChildren = countAvailableChildren(children, currentUser);
    const indicatorWidthOnFullWidth = tabbedContainerWidth / totalsChildren;
    setIndicatorLeft(
      getIndicatorPosition(
        value,
        totalsChildren,
        tabbedContainerWidth,
        tabWidth,
        tabIndicatorWidthProp,
        variant,
        indicatorWidthOnFullWidth,
      ),
    );

    if (variant === 'fullWidth') {
      setIndicatorWidth(indicatorWidthOnFullWidth);
    } else {
      setIndicatorWidth(tabIndicatorWidthProp);
    }
  }, [children, currentUser, tabIndicatorWidthProp, tabWidth, value, variant]);

  return (
    <TabsWrapper ref={tabsWrapperRef} variant={variant}>
      <TabsIndicator left={indicatorLeft} position={tabIndicatorPosition} width={indicatorWidth} />
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

const Tab = ({
  value,
  onChange,
  label,
  icon,
  index,
  onlyAdmin = false,
  tabWidth = 160,
  variant = 'default',
}: TabProps) => {
  const { t } = useTranslation();
  const [currentUser] = useCurrentUser();
  const itemRef = useRef<HTMLButtonElement>(null);

  if (!hasAccess(onlyAdmin, currentUser)) {
    return null;
  }

  const onClick = (event: MouseEvent) => {
    onChange && onChange(event, index as number);
    itemRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'end' });
  };
  const isActive = value === index;

  return (
    <TabButton
      ref={itemRef}
      onClick={onClick}
      width={tabWidth}
      isActive={isActive}
      variant={variant}
    >
      {icon && icon}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <TabLabel isActive={isActive}>{t(label as any)}</TabLabel>
      <RippleEffect />
    </TabButton>
  );
};

const TabPanel = ({ value, index, children }: TabPanelProps) => {
  if (value !== index) {
    return null;
  }
  return <TabPanelWrapper>{children}</TabPanelWrapper>;
};

export default {
  Tabs,
  Tab,
  TabPanel,
};
