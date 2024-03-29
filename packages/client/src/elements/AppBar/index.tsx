import React, { MouseEvent, useEffect, useMemo, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { routes } from '../../constants';
import { useCurrentUser, useMediaDevice } from '../../hooks';
import { AdminIcon, DashboardIcon, HistoryIcon, SettingsIcon } from '../../icons';
import { AdminDashboard, Dashboard, History, Settings } from '../../pages';
import mapRoutesToArray from '../../utils/mapRoutesToArray';
import { BackgroundSideLogo } from '../index';
import TabbedLayout from '../layouts/TabbedLayout';
import { hasAccess } from '../layouts/TabbedLayout/Tabs/Tabs.utils';
import { AppBarPageWrapper, TabPageWrapper, TabsWrapper, Wrapper } from './AppBar.styled';
import { AppBarItem, AppBarProps } from './AppBar.types';

const { HOME, HISTORY, SETTINGS, admin } = routes.authorized.appBar;

const defaultTabs: Array<AppBarItem> = [
  {
    index: 0,
    indexMobile: 1,
    path: HOME,
    exact: true,
    label: 'menu.dashboard',
    icon: <DashboardIcon />,
    component: Dashboard,
  },
  {
    index: 1,
    indexMobile: 0,
    path: HISTORY,
    label: 'menu.history',
    icon: <HistoryIcon />,
    component: History,
  },
  {
    index: 2,
    path: mapRoutesToArray(admin),
    label: 'menu.admin',
    icon: <AdminIcon />,
    onlyAdmin: true,
    component: AdminDashboard,
    exact: true,
  },
  {
    index: 3,
    path: SETTINGS,
    label: 'menu.settings',
    icon: <SettingsIcon />,
    component: Settings,
  },
];

const getTabPath = (tab: AppBarItem): string => {
  let internalTabPath = tab.path;
  if (Array.isArray(internalTabPath)) {
    [internalTabPath] = tab.path;
  }
  return internalTabPath;
};

const AppBar = ({ tabs = defaultTabs }: AppBarProps) => {
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
    [currentUser, isMobile, tabs],
  );

  const history = useHistory();
  const activeTabFromUrl = useMemo(
    () =>
      sortedItems.find((tab) => {
        const historyPath = history.location.pathname;
        const internalTabPath = getTabPath(tab);

        if (internalTabPath === '/') {
          return historyPath === internalTabPath;
        }
        return historyPath.startsWith(internalTabPath);
      })?.index,
    [history.location.pathname, sortedItems],
  );

  const defaultActiveTab = activeTabFromUrl ?? 1;
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);

  useEffect(() => {
    setActiveTab(defaultActiveTab);
  }, [defaultActiveTab, isMobile]);

  const handleChange = (event: MouseEvent, newValue: number) => {
    setActiveTab(newValue);
    const selectedTab = sortedItems.find(
      (tab) => newValue === (isMobile ? tab.indexMobile ?? tab.index : tab.index),
    );
    if (selectedTab) {
      history.push(getTabPath(selectedTab));
    }
  };

  const orientation = isMobile ? 'horizontal' : 'vertical';

  return (
    <Wrapper data-testid="appBar" orientation={orientation}>
      <TabPageWrapper orientation={orientation}>
        <Switch>
          {sortedItems.map(({ component: Component, exact, path, index, ...rest }) => (
            <Route
              exact={exact}
              key={index}
              path={path}
              render={(routeProps) => (
                <TabbedLayout.TabPanel value={activeTab} index={index} {...rest}>
                  <AppBarPageWrapper>
                    <BackgroundSideLogo />
                    <Component {...routeProps} />
                  </AppBarPageWrapper>
                </TabbedLayout.TabPanel>
              )}
            />
          ))}
          <Redirect to={routes.unauthorized.PAGE_NOT_FOUND} />
        </Switch>
      </TabPageWrapper>

      <TabsWrapper orientation={orientation}>
        <TabbedLayout.Tabs
          value={activeTab}
          onChange={handleChange}
          options={{
            tabWidth: isMobile ? 160 : 130,
            indicatorPosition: isMobile ? 'top' : 'right',
            variant: isMobile ? 'fullWidth' : 'default',
            orientation,
          }}
        >
          {sortedItems.map((tabProps) => (
            <TabbedLayout.Tab {...tabProps} key={getTabPath(tabProps)} />
          ))}
        </TabbedLayout.Tabs>
      </TabsWrapper>
    </Wrapper>
  );
};

AppBar.displayName = 'AppBar';

export default AppBar;
