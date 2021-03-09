import React, { forwardRef, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import { LockIcon } from '../../../icons';
import { getLabelFromSource, getPlaceholderFromSource } from '../../../utils';
import PasswordIconButton from './PasswordIconButton';
import { Container, Error, InputAdornment, Label, StyledInput } from './TextField.styled';
import { ITextFieldProps, TextFieldProps } from './TextField.types';

const TextField = forwardRef<ITextFieldProps, TextFieldProps>(
  (
    {
      placeholder,
      startAdornment,
      endAdornment,
      error,
      name,
      label,
      required,
      maxWidth,
      type,
      ...rest
    },
    ref,
  ) => {
    const [isPasswordMasked, setPasswordMasked] = useState(true);
    const [internalType, setInternalType] = useState(type);
    const theme = useTheme();
    const isPassword = type === 'password';
    let internalStartAdornment = startAdornment;
    let internalEndAdornment = endAdornment;

    if (isPassword) {
      internalStartAdornment = <LockIcon color={theme.palette.action.error} />;
      internalEndAdornment = <PasswordIconButton setPasswordMasked={setPasswordMasked} />;
    }

    useEffect(() => {
      if (type === 'password') {
        if (isPasswordMasked) {
          setInternalType('password');
        } else {
          setInternalType('text');
        }
      }
    }, [isPasswordMasked, type]);

    return (
      <Container isPasswordMasked={isPasswordMasked}>
        <StyledInput
          data-testid="textField"
          ref={ref}
          id={name}
          maxWidth={maxWidth}
          name={name}
          showPassword={isPassword && !isPasswordMasked}
          isStartAdornment={Boolean(internalStartAdornment)}
          isEndAdornment={Boolean(endAdornment)}
          isError={Boolean(error)}
          type={internalType}
          placeholder={placeholder || `Enter your ${getPlaceholderFromSource(name)}`}
          {...rest}
        />
        <Label htmlFor={name} isError={Boolean(error)} required={required}>
          {label || getLabelFromSource(name)}
        </Label>
        {internalStartAdornment && (
          <InputAdornment position="start">{internalStartAdornment}</InputAdornment>
        )}
        {internalEndAdornment && (
          <InputAdornment position="end">{internalEndAdornment}</InputAdornment>
        )}
        <Error>{error}</Error>
      </Container>
    );
  },
);

export default TextField;
