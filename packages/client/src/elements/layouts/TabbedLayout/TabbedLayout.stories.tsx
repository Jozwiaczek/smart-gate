import { Meta, Story } from '@storybook/react/types-6-0';
import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';

import { AdminIcon, DashboardIcon, HistoryIcon, SettingsIcon } from '../../../icons';
import TabbedLayout from '.';
import { TabProps } from './Tab/Tab.types';
import { TabsOptions, TabsOrientation } from './Tabs/Tabs.types';

const MockRoot = styled.div<{ orientation?: TabsOrientation; width?: string }>`
  ${({ width }) => `width: ${width ?? '800px'};`};
  height: 80%;
  border: 2px solid ${({ theme }) => theme.palette.divider.default};
  ${({ orientation }) => orientation === 'vertical' && 'display: flex'};
`;

const MockTabsWrapper = styled.div<{ orientation?: TabsOrientation }>`
  width: 100%;
  height: 90px;
  background: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.palette.boxShadow.default};
  ${({ orientation }) =>
    orientation === 'vertical' &&
    `
      height: 100%;
      width: 160px;
  `};
`;

export default {
  title: 'Elements/layouts/Tabbed Layout',
  component: TabbedLayout.Tabs,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'fullWidth', 'scrollable - TODO'],
      },
    },
    indicatorPosition: {
      control: {
        type: 'select',
        options: ['bottom', 'top', 'left', 'right'],
      },
    },
    orientation: {
      control: {
        type: 'select',
        options: ['horizontal', 'vertical'],
      },
    },
    indicatorThin: {
      control: {
        type: 'number',
      },
    },
    indicatorWidth: {
      control: {
        type: 'number',
      },
    },
    indicatorHeight: {
      control: {
        type: 'number',
      },
    },
    tabWidth: {
      control: {
        type: 'number',
      },
    },
    tabHeight: {
      control: {
        type: 'number',
      },
    },
  },
} as Meta;

interface TabbedLayoutStoriesOptions extends TabsOptions {
  mockRootWidth?: string;
}

const Template: Story<TabbedLayoutStoriesOptions> = (tabsOptions) => {
  const [value, setValue] = useState(0);
  const { orientation, mockRootWidth } = tabsOptions;

  const handleChange = (event: MouseEvent, newValue: number) => setValue(newValue);

  const tabs: Array<TabProps> = [
    {
      label: 'History',
      icon: <HistoryIcon />,
    },
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      label: 'Settings',
      icon: <SettingsIcon />,
    },
    {
      label: 'Admin',
      icon: <AdminIcon />,
      onlyAdmin: true,
    },
  ];

  return (
    <MockRoot orientation={orientation} width={mockRootWidth}>
      <MockTabsWrapper orientation={orientation}>
        <TabbedLayout.Tabs value={value} onChange={handleChange} options={tabsOptions}>
          {tabs.map((tabProps) => (
            <TabbedLayout.Tab key={tabProps.label} {...tabProps} />
          ))}
        </TabbedLayout.Tabs>
      </MockTabsWrapper>
      <TabbedLayout.TabPanel value={value} index={0}>
        <p>History panel</p>
      </TabbedLayout.TabPanel>
      {value === 1 && (
        <div>
          <p>Raw div with render condition</p>
        </div>
      )}
      <TabbedLayout.TabPanel value={value} index={2}>
        <p>Settings panel</p>
      </TabbedLayout.TabPanel>
      <TabbedLayout.TabPanel value={value} index={3}>
        <p>Admin panel - accessible only for logged admin users</p>
      </TabbedLayout.TabPanel>
    </MockRoot>
  );
};

export const defaultView = Template.bind({});

export const fullWidthView = Template.bind({});
fullWidthView.args = {
  variant: 'fullWidth',
};

export const verticalView = Template.bind({});
verticalView.args = {
  orientation: 'vertical',
};

export const scrollableView = Template.bind({});
scrollableView.args = {
  variant: 'scrollable',
  mockRootWidth: '300px',
};
