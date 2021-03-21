import React from 'react';

import { TabPanelWrapper } from './TabPanel.styled';
import { TabPanelProps } from './TabPanel.types';

const TabPanel = ({ value, index, children }: TabPanelProps) => {
  if (value !== index) {
    return null;
  }

  return <TabPanelWrapper>{children}</TabPanelWrapper>;
};

export default TabPanel;
