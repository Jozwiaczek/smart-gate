import React, { useState } from 'react';

import { AdminIcon, DashboardIcon, HistoryIcon, SettingsIcon } from '../../icons';
import { Item, ItemLabel, StyledIconButton, Wrapper } from './AppBar.styled';
import { AppBarItem, ItemTitle } from './AppBar.types';

const AppBar = () => {
  const [activeItem, setActiveItem] = useState<ItemTitle>('Dashboard');

  const items: Array<AppBarItem> = [
    {
      title: 'History',
      icon: <HistoryIcon />,
    },
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Settings',
      icon: <SettingsIcon />,
    },
    {
      title: 'Admin',
      icon: <AdminIcon />,
      onlyAdmin: true,
    },
  ];

  return (
    <Wrapper data-testid="appBar">
      {items.map(({ title, icon }) => {
        const isActive = activeItem === title;

        return (
          <Item key={title}>
            <StyledIconButton isActive={isActive} onClick={() => setActiveItem(title)}>
              {icon}
            </StyledIconButton>
            <ItemLabel isActive={isActive}>{title}</ItemLabel>
          </Item>
        );
      })}
    </Wrapper>
  );
};

AppBar.displayName = 'AppBar';

export default AppBar;
