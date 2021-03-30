import React, { MouseEvent, useEffect, useMemo, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { routes } from '../../constants';
import { useCurrentUser, useMediaDevice } from '../../hooks';
import { AdminIcon, DashboardIcon, HistoryIcon, SettingsIcon } from '../../icons';
import { Admin, Dashboard } from '../../pages';
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
    component: <Dashboard />,
  },
  {
    index: 1,
    indexMobile: 0,
    path: HISTORY,
    label: 'menu.history',
    icon: <HistoryIcon />,
    component: <p>history</p>,
  },
  {
    index: 2,
    path: mapRoutesToArray(admin),
    label: 'menu.admin',
    icon: <AdminIcon />,
    onlyAdmin: false,
    component: <Admin />,
    exact: true,
  },
  {
    index: 3,
    path: SETTINGS,
    label: 'menu.settings',
    icon: <SettingsIcon />,
    component: <p>settings</p>,
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
                  <AppBarPageWrapper>
                    <BackgroundSideLogo />
                    {component}
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
            indicatorWidth: 80,
            variant: isMobile ? 'fullWidth' : 'default',
            orientation,
          }}
        >
          {sortedItems.map((tabProps) => (
            <TabbedLayout.Tab
              {...tabProps}
              key={getTabPath(tabProps)}
              path={getTabPath(tabProps)}
            />
          ))}
        </TabbedLayout.Tabs>
      </TabsWrapper>
    </Wrapper>
  );
};

AppBar.displayName = 'AppBar';

export default AppBar;
