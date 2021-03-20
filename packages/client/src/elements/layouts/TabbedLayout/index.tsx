import React, {
  Children,
  cloneElement,
  isValidElement,
  MouseEvent,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { Role } from '../../../enums/role.enum';
import { useCurrentUser } from '../../../hooks';
import { User } from '../../../providers/api/CurrentUserProvider/CurrentUserProvider.types';
import { RippleEffect } from '../../animations';
import {
  TabButton,
  TabLabel,
  TabPanelWrapper,
  TabsIndicator,
  TabsWrapper,
} from './TabbedLayout.styled';
import { TabPanelProps, TabProps, TabsProps } from './TabbedLayout.types';

const getIndicatorPosition = (
  value: number,
  totalChildren: number,
  containerWidth: number,
  tabWidth: number,
  tabIndicatorSize: number,
): number => {
  console.log('L:32 | tabIndicatorSize: ', tabIndicatorSize); // TODO: handle indicator width diff

  const totalChildrenWidth = totalChildren * tabWidth;
  const totalEmptyWidth = containerWidth - totalChildrenWidth;
  const singleEmptyWidth = totalEmptyWidth / (totalChildren + 1);
  const trimmedSingleEmptyWidth = singleEmptyWidth <= 0 ? 0 : singleEmptyWidth;

  if (value === 0) {
    return trimmedSingleEmptyWidth;
  }

  const emptyWidthForValue = (value + 1) * trimmedSingleEmptyWidth;
  const tabsWidthForValue = value * tabWidth;

  return emptyWidthForValue + tabsWidthForValue;
};

const hasAccess = (onlyAdmin: boolean, user?: User) =>
  !(onlyAdmin && !user?.roles.includes(Role.Admin));

const countAvailableChildren = (children: ReactNode, user?: User) =>
  Children.count(
    Children.map(children, (child) => {
      if (isValidElement(child)) {
        const { onlyAdmin } = child.props;
        if (hasAccess(onlyAdmin, user)) {
          return child;
        }
      }
    }),
  );

const Tabs = ({ children, onChange, value, options = {} }: TabsProps) => {
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [currentUser] = useCurrentUser();
  const { tabIndicatorPosition = 'bottom', tabWidth = 160, tabIndicatorSize = tabWidth } = options;

  // TODO: Create tabs items refs for dynamically calculating total children width, instead constant 'tabWidth'.
  useLayoutEffect(() => {
    const tabbedContainerWidth = tabsWrapperRef.current?.offsetWidth || 0;
    const totalsChildren = countAvailableChildren(children, currentUser);
    setIndicatorLeft(
      getIndicatorPosition(value, totalsChildren, tabbedContainerWidth, tabWidth, tabIndicatorSize),
    );
  }, [children, currentUser, tabIndicatorSize, tabWidth, value]);

  return (
    <TabsWrapper ref={tabsWrapperRef}>
      <TabsIndicator
        left={indicatorLeft}
        position={tabIndicatorPosition}
        width={tabIndicatorSize}
      />
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          const tabInjectProps: TabProps = {
            ...child.props,
            value,
            onChange,
            index,
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
}: TabProps) => {
  const { t } = useTranslation();
  const [currentUser] = useCurrentUser();

  if (!hasAccess(onlyAdmin, currentUser)) {
    return null;
  }

  const onClick = (event: MouseEvent) => onChange && onChange(event, index as number);
  const isActive = value === index;

  return (
    <TabButton onClick={onClick} width={tabWidth} isActive={isActive}>
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
