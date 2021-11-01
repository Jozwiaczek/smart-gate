import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';

import { useSnackbar } from '../../hooks';
import { KeyIcon } from '../../icons';
import { ShowSnackbarProps } from '../../providers/SnackbarProvider/SnackbarProvider.types';
import Snackbar from '.';
import { SnackbarProps } from './Snackbar.types';

export default {
  title: 'Elements/Snackbar',
  component: Snackbar,
  argTypes: {
    severity: {
      options: ['info', 'error', 'success', 'warning'],
      control: { type: 'radio' },
    },
  },
} as Meta;

export const Default: Story<SnackbarProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open snackbar
      </button>
      <Snackbar {...args} onClose={() => setIsOpen(false)} open={isOpen} />
    </>
  );
};
Default.args = {
  children: 'Lorem ipsum Oops, Something Went Wrong',
  severity: 'info',
};

export const WithHook: Story<ShowSnackbarProps> = (args) => {
  const showSnackbar = useSnackbar();
  const onClick = () => {
    showSnackbar(args);
  };

  return (
    <button type="button" onClick={onClick}>
      Open snackbar
    </button>
  );
};
WithHook.args = {
  message: 'Lorem ipsum Oops, Something Went Wrong',
  severity: 'info',
  duration: 5000,
  leftAdornment: KeyIcon,
};
