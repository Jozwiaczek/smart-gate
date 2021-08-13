import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import { ThemeType } from '../../../theme/Theme';
import ThemeTypeIndicator from '.';

export default {
  title: 'Elements/animations/Theme Type Indicator',
  component: ThemeTypeIndicator,
} as Meta;

const Template: Story = () => {
  const [themeType, setThemeType] = useState<ThemeType>(ThemeType.dark);

  const showDark = () => {
    setThemeType(ThemeType.dark);
  };

  const showLight = () => {
    setThemeType(ThemeType.light);
  };

  return (
    <>
      <button type="button" onClick={showDark}>
        Dark
      </button>
      <button type="button" onClick={showLight}>
        Light
      </button>
      <div style={{ height: 42, marginLeft: 50 }}>
        <ThemeTypeIndicator themeType={themeType} />
      </div>
    </>
  );
};

export const Default = Template.bind({});
Default.parameters = {
  chromatic: { disable: true },
};
