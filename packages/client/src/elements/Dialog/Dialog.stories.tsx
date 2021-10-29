import { Meta, Story } from '@storybook/react';
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
  title: 'Example Dialog',
  description: 'Nobilis luna vix dignuss vigil est.',
  isOpen: true,
  close: () => console.log('test'),
  children: (
    <>
      <p>Lorem Ipsum#1</p>
      <p>Lorem Ipsum#2</p>
      <button type="button">test btn</button>
    </>
  ),
};
