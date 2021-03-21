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
      {label && <TabLabel isActive={isActive}>{t(label as any)}</TabLabel>}
      <RippleEffect />
    </TabButton>
  );
};

export default Tab;
