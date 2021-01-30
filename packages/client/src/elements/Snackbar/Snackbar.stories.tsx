import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Snackbar from './Snackbar';
import { SnackbarProps } from './Snackbar.types';

export default {
  title: 'Elements/Snackbar',
  component: Snackbar,
} as Meta;

const StoryWrapper = (props: SnackbarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Snackbar {...props} onClose={() => setIsOpen(false)} open={isOpen}>
        Lorem ipsum Oops, Something Went Wrong
      </Snackbar>
    </>
  );
};

const Template: Story<SnackbarProps> = (args) => <StoryWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {};
