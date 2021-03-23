import React, { MouseEvent, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { routes } from '../../constants';
import { Dashboard } from '../../containers';
import { useCurrentUser, useMediaDevice } from '../../hooks';
import { AdminIcon, DashboardIcon, HistoryIcon, SettingsIcon } from '../../icons';
import TabbedLayout from '../layouts/TabbedLayout';
import { hasAccess } from '../layouts/TabbedLayout/Tabs/Tabs.utils';
import { TabPageWrapper, TabsWrapper, Wrapper } from './AppBar.styled';
import { AppBarItem } from './AppBar.types';

const AppBar = () => {
  const { isMobile } = useMediaDevice();
  const tabs: Array<AppBarItem> = [
    {
      index: isMobile ? 0 : 1,
      path: '/history',
      label: 'menu.history',
      icon: <HistoryIcon />,
      component: <p>history</p>,
    },
    {
      index: isMobile ? 1 : 0,
      path: '/',
      label: 'menu.dashboard',
      icon: <DashboardIcon />,
      component: <Dashboard />,
    },
    {
      index: 2,
      path: '/settings',
      label: 'menu.settings',
      icon: <SettingsIcon />,
      component: <p>settings</p>,
    },
    {
      index: 3,
      path: '/admin',
      label: 'menu.admin',
      icon: <AdminIcon />,
      onlyAdmin: true,
      component: <p>admin</p>,
    },
  ].sort((tabA, tabB) => tabA.index - tabB.index);

  const history = useHistory();
  const activeTabFromUrl = tabs.find((tab) => tab.path === history.location.pathname)?.index;
  const defaultActiveTab = activeTabFromUrl === undefined ? 1 : activeTabFromUrl;
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);
  const [currentUser] = useCurrentUser();

  const handleChange = (event: MouseEvent, newValue: number, path: string) => {
    setActiveTab(newValue);
    history.push(path);
  };

  const orientation = isMobile ? 'horizontal' : 'vertical';

  return (
    <Wrapper data-testid="appBar" orientation={orientation}>
      <TabPageWrapper orientation={orientation}>
        <Switch>
          {tabs.map(({ component, path, index, onlyAdmin = false, ...rest }) => {
            if (!hasAccess(onlyAdmin, currentUser)) {
              return null;
            }

            return (
              <Route
                key={index}
                path={path}
                render={() => (
                  <TabbedLayout.TabPanel value={activeTab} index={index} {...rest}>
                    {component}
                  </TabbedLayout.TabPanel>
                )}
              />
            );
          })}
          <Redirect to={routes.PAGE_NOT_FOUND} />
        </Switch>
      </TabPageWrapper>

      <TabsWrapper orientation={orientation}>
        <TabbedLayout.Tabs
          value={activeTab}
          onChange={handleChange}
          options={{
            indicatorPosition: isMobile ? 'top' : 'right',
            indicatorWidth: 80,
            variant: isMobile ? 'fullWidth' : 'default',
            orientation,
          }}
        >
          {tabs.map((tabProps) => (
            <TabbedLayout.Tab key={tabProps.label} {...tabProps} />
          ))}
        </TabbedLayout.Tabs>
      </TabsWrapper>
    </Wrapper>
  );
};

AppBar.displayName = 'AppBar';

export default AppBar;
