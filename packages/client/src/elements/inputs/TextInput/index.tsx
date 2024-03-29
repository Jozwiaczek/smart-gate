import React, { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { EmailIcon, LockIcon } from '../../../icons';
import { getLabelFromSource, getPlaceholderFromSource } from '../../../utils';
import PasswordIconButton from './PasswordIconButton';
import { Container, Error, InputAdornment, Label, StyledInput } from './TextInput.styled';
import { TextInputProps } from './TextInput.types';

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
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
    const { t } = useTranslation();
    const [isPasswordMasked, setPasswordMasked] = useState(true);
    const [internalType, setInternalType] = useState(type);
    const theme = useTheme();
    const isPassword = type === 'password';
    let internalStartAdornment = startAdornment;
    let internalEndAdornment = endAdornment;

    if (isPassword) {
      internalStartAdornment = startAdornment || <LockIcon color={theme.palette.colors.red} />;
      internalEndAdornment = <PasswordIconButton setPasswordMasked={setPasswordMasked} />;
    }

    if (name === 'email' && !startAdornment) {
      internalStartAdornment = <EmailIcon />;
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
          data-testid="textInput"
          ref={ref}
          id={name}
          maxWidth={maxWidth}
          name={name}
          showPassword={isPassword && !isPasswordMasked}
          isStartAdornment={Boolean(internalStartAdornment)}
          isEndAdornment={Boolean(internalEndAdornment)}
          isError={Boolean(error)}
          type={internalType}
          placeholder={
            placeholder ||
            `${t('form.inputs.defaultPlaceholderBase')} ${getPlaceholderFromSource(label || name)}`
          }
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

export default TextInput;
