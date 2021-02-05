import React, { forwardRef, useMemo } from 'react';
import { getLabelFromName } from '../../../utils';
import { Container, Error, IconContainer, Label, StyledInput } from './TextField.styled';
import { ITextFieldProps, TextFieldProps } from './TextField.types';

const TextField = forwardRef<ITextFieldProps, TextFieldProps>(
  ({ errors, name, label, icon, required, handleChange, maxWidth, ...rest }, ref) => {
    const fieldError = errors && errors[name];

    const error = useMemo((): string | null => {
      if (!fieldError) {
        return null;
      }

      if (fieldError.type === 'required') {
        return 'Required';
      }

      return fieldError.message;
    }, [fieldError]);

    return (
      <Container>
        <StyledInput
          ref={ref}
          id={name}
          isError={Boolean(fieldError)}
          maxWidth={maxWidth}
          name={name}
          isIcon={!!icon}
          onChange={(e) => {
            const newValue = e.target.value;
            handleChange && handleChange(newValue);
          }}
          required={required}
          {...rest}
        />
        <Label htmlFor={name} isError={Boolean(fieldError)} required={required}>
          {label || getLabelFromName(name)}
        </Label>
        {icon && <IconContainer>{icon}</IconContainer>}
        <Error>{error}</Error>
      </Container>
    );
  },
);

export default TextField;
