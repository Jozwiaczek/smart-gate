import React from 'react';
import Spinner from '../Spinner';
import { StyledButton } from './Button.styled';
import { ButtonProps } from './Button.types';

const Button = ({ children, color = 'primary', loading, disabled, ...rest }: ButtonProps) => (
  <StyledButton color={color} disabled={loading ? true : disabled} {...rest}>
    {loading && <Spinner color="primary" margin="0 8px 0 0" />}
    {children}
  </StyledButton>
);

export default Button;
