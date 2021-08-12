import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import Checkmark from '.';
import { CheckmarkProps } from './Checkmark.types';

export default {
  title: 'Elements/animations/Checkmark',
  component: Checkmark,
} as Meta;

const Template: Story<CheckmarkProps> = () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <button type="button" onClick={() => setVisible(true)}>
        Show
      </button>
      <button type="button" onClick={() => setVisible(false)}>
        Hide
      </button>
      <div style={{ height: 30, color: '#257D69' }}>
        <Checkmark visible={visible} />
      </div>
    </>
  );
};

export const Default = Template.bind({});
Default.parameters = {
  chromatic: { disable: true },
};
