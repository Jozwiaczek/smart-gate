import React, { forwardRef, MouseEvent, useEffect, useState } from 'react';

import { CloseEyeIcon, OpenEyeIcon } from '../../../icons';
import LockIcon from '../../../icons/LockIcon';
import { getLabelFromName } from '../../../utils';
import IconButton from '../../IconButton';
import { Container, Error, InputAdornment, Label, StyledInput } from './TextField.styled';
import { ITextFieldProps, TextFieldProps } from './TextField.types';

const TextField = forwardRef<ITextFieldProps, TextFieldProps>(
  (
    { startAdornment, endAdornment, error, name, label, required, maxWidth, type, ...rest },
    ref,
  ) => {
    const [isPasswordMasked, setPasswordMasked] = useState(true);
    const [internalType, setInternalType] = useState(type);
    const isPassword = type === 'password';
    let internalStartAdornment = startAdornment;
    let internalEndAdornment = endAdornment;

    const togglePasswordMask = () => {
      setPasswordMasked((prev) => !prev);
    };

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const passwordToggleIcon = (
      <IconButton
        aria-label="Toggle password visibility"
        onClick={togglePasswordMask}
        onMouseDown={handleMouseDownPassword}
        color="primary"
      >
        {isPasswordMasked ? <CloseEyeIcon /> : <OpenEyeIcon />}
      </IconButton>
    );

    if (isPassword) {
      internalStartAdornment = <LockIcon />;
      internalEndAdornment = passwordToggleIcon;
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
      <Container>
        <StyledInput
          ref={ref}
          id={name}
          isError={Boolean(error)}
          maxWidth={maxWidth}
          name={name}
          isStartAdornment={Boolean(internalStartAdornment)}
          isEndAdornment={Boolean(endAdornment)}
          required={required}
          type={internalType}
          {...rest}
        />
        <Label htmlFor={name} isError={Boolean(error)} required={required}>
          {label || getLabelFromName(name)}
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
