import React from 'react';
import { useTranslation } from 'react-i18next';

import { ArrowIcon } from '../../../icons';
import { ThemeType } from '../../../theme/Theme';
import { RippleEffect } from '../../animations';
import Spinner from '../../animations/Spinner';
import Link from '../../Link';
import { StyledButton } from './Button.styled';
import { ButtonProps } from './Button.types';

const Button = ({
  'data-testid': dataTestId,
  children,
  colorVariant = ThemeType.light,
  loading,
  label,
  to,
  disabled,
  withArrow,
  fullWidth,
  ...rest
}: ButtonProps) => {
  const { t } = useTranslation();

  const baseButton = (
    <StyledButton
      data-testid={dataTestId ?? 'button'}
      colorVariant={colorVariant}
      fullWidth={fullWidth}
      disabled={loading ? true : disabled}
      {...rest}
    >
      {loading && <Spinner margin="0 8px 0 0" />}
      {t(label as never) || children}
      {withArrow && <ArrowIcon />}
      {!loading && !disabled && <RippleEffect />}
    </StyledButton>
  );

  if (to) {
    return (
      <Link to={to} $asButton $fullWidth={fullWidth} {...rest}>
        {baseButton}
      </Link>
    );
  }

  return baseButton;
};

Button.displayName = 'Button';

export default Button;
