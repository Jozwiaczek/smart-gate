import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../icons';
import Spinner from '../Spinner';
import { IconContainer, StyledButton } from './Button.styled';
import { ButtonProps } from './Button.types';

const Button = ({
  children,
  color = 'primary',
  loading,
  to,
  disabled,
  withArrow,
  ...rest
}: ButtonProps) => {
  const baseButton = (
    <StyledButton color={color} disabled={loading ? true : disabled} {...rest}>
      {loading && <Spinner color="primary" margin="0 8px 0 0" />}
      {children}
      {withArrow && (
        <IconContainer>
          <ArrowIcon />
        </IconContainer>
      )}
    </StyledButton>
  );

  if (to) {
    return <Link to={to}>{baseButton}</Link>;
  }

  return baseButton;
};

export default Button;
