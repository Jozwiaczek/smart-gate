import React from 'react';

import { ArrowIcon } from '../../icons';
import { ThemeType } from '../../theme/Theme';
import Link from '../Link';
import Spinner from '../Spinner';
import { IconContainer, StyledButton } from './Button.styled';
import { ButtonProps } from './Button.types';

const Button = ({
  children,
  colorVariant = ThemeType.light,
  loading,
  to,
  disabled,
  withArrow,
  ...rest
}: ButtonProps) => {
  const baseButton = (
    <StyledButton colorVariant={colorVariant} disabled={loading ? true : disabled} {...rest}>
      {loading && <Spinner color={ThemeType.dark} margin="0 8px 0 0" />}
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
