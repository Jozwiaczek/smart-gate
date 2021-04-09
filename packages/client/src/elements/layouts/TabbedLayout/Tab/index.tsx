import React, { MouseEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useCurrentUser } from '../../../../hooks';
import { RippleEffect } from '../../../animations';
import { hasAccess } from '../Tabs/Tabs.utils';
import { TabButton, TabLabel } from './Tab.styled';
import { TabProps } from './Tab.types';

const Tab = ({
  value,
  onChange,
  label,
  icon,
  index,
  onlyAdmin = false,
  tabWidth = 160,
  tabHeight = 160,
  orientation = 'horizontal',
  variant = 'default',
}: TabProps) => {
  const { t } = useTranslation();
  const [currentUser] = useCurrentUser();
  const tabRef = useRef<HTMLButtonElement>(null);

  if (!hasAccess(onlyAdmin, currentUser)) {
    return null;
  }

  const onClick = (event: MouseEvent) => {
    onChange && onChange(event, index as number);

    if (variant === 'scrollable') {
      tabRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
  };
  const isActive = value === index;

  let width = variant === 'fullWidth' ? '100%' : `${tabWidth}px`;
  let height = '100%';
  if (orientation === 'vertical') {
    width = `${tabWidth}px`;
    height = variant === 'fullWidth' ? '100%' : `${tabHeight}px`;
  }

  return (
    <TabButton
      ref={tabRef}
      onClick={onClick}
      width={width}
      height={height}
      isActive={isActive}
      variant={variant}
    >
      {icon && icon}
      {label && <TabLabel isActive={isActive}>{t(label as never)}</TabLabel>}
      <RippleEffect />
    </TabButton>
  );
};

export default Tab;
