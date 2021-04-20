import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import Dialog from '.';
import { DialogProps } from './Dialog.types';

export default {
  title: 'Elements/Dialog',
  component: Dialog,
} as Meta;

const Template: Story<DialogProps> = (args) => (
  <div>
    <h1>Background title</h1>
    <p>Cliniass potus ine tolosa! Meaningless advices needs most intuitions.</p>
    <Dialog {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: <>Lorem Ipsum</>,
};
