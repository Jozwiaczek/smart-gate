import React from 'react';
import { CloseButton, SnackbarWrapper } from './Snackbar.styled';
import { SnackbarProps } from './Snackbar.types';

const Snackbar = ({ children, open = true, onClose, severity = 'info' }: SnackbarProps) => (
  <SnackbarWrapper open={open} severity={severity}>
    {children}
    <CloseButton onClick={onClose} severity={severity} />
  </SnackbarWrapper>
);

export default Snackbar;
