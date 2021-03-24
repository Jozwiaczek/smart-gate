import React, { MouseEvent, useEffect, useMemo, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { routes } from '../../constants';
import { Dashboard } from '../../containers';
import { useCurrentUser, useMediaDevice } from '../../hooks';
import { AdminIcon, DashboardIcon, HistoryIcon, SettingsIcon } from '../../icons';
import TabbedLayout from '../layouts/TabbedLayout';
import { hasAccess } from '../layouts/TabbedLayout/Tabs/Tabs.utils';
import { TabPageWrapper, TabsWrapper, Wrapper } from './AppBar.styled';
import { AppBarItem } from './AppBar.types';

const tabs: Array<AppBarItem> = [
  {
    index: 0,
    indexMobile: 1,
    path: '/',
    exact: true,
    label: 'menu.dashboard',
    icon: <DashboardIcon />,
    component: <Dashboard />,
  },
  {
    index: 1,
    indexMobile: 0,
    path: '/history',
    label: 'menu.history',
    icon: <HistoryIcon />,
    component: <p>history</p>,
  },
  {
    index: 2,
    path: '/admin',
    label: 'menu.admin',
    icon: <AdminIcon />,
    onlyAdmin: false,
    component: <p>admin</p>,
  },
  {
    index: 3,
    path: '/settings',
    label: 'menu.settings',
    icon: <SettingsIcon />,
    component: <p>settings</p>,
  },
];

const AppBar = () => {
  const { isMobile } = useMediaDevice();
  const [currentUser] = useCurrentUser();
  const sortedItems = useMemo(
    () =>
      tabs
        .filter((tab) => hasAccess(tab.onlyAdmin, currentUser))
        .map((tab) => {
          const { index, indexMobile } = tab;
          const reindexTab = tab;
          if (isMobile) {
            reindexTab.index = indexMobile ?? index;
          }
          return reindexTab;
        })
        .sort((tabA, tabB) => tabA.index - tabB.index)
        .map((tab, index) => {
          const reindexTab = tab;
          reindexTab.index = index;
          return reindexTab;
        }),
    [currentUser, isMobile],
  );

  const history = useHistory();
  const activeTabFromUrl = useMemo(
    () =>
      sortedItems.find((tab) => {
        const historyPath = history.location.pathname;
        if (tab.path === '/') {
          return historyPath === tab.path;
        }
        return historyPath.startsWith(tab.path);
      })?.index,
    [history.location.pathname, sortedItems],
  );

  const defaultActiveTab = activeTabFromUrl ?? 1;
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);

  useEffect(() => {
    setActiveTab(defaultActiveTab);
  }, [defaultActiveTab, isMobile]);

  const handleChange = (event: MouseEvent, newValue: number, path: string) => {
    setActiveTab(newValue);
    history.push(path);
  };

  const orientation = isMobile ? 'horizontal' : 'vertical';

  return (
    <Wrapper data-testid="appBar" orientation={orientation}>
      <TabPageWrapper orientation={orientation}>
        <Switch>
          {sortedItems.map(({ component, exact, path, index, ...rest }) => (
            <Route
              exact={exact}
              key={index}
              path={path}
              render={() => (
                <TabbedLayout.TabPanel value={activeTab} index={index} {...rest}>
                  {component}
                </TabbedLayout.TabPanel>
              )}
            />
          ))}
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
          {sortedItems.map((tabProps) => (
            <TabbedLayout.Tab key={tabProps.path} {...tabProps} />
          ))}
        </TabbedLayout.Tabs>
      </TabsWrapper>
    </Wrapper>
  );
};

AppBar.displayName = 'AppBar';

export default AppBar;
