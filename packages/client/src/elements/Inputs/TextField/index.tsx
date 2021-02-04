import React, { forwardRef, useMemo, useState } from 'react';
import { Container, IconContainer, Error, Label, StyledInput } from './TextField.styled';
import { ITextFieldProps, TextFieldProps } from './TextField.types';

const TextField = forwardRef<ITextFieldProps, TextFieldProps>(
  ({ errors, name, icon, defaultValue, required, handleChange, maxWidth, ...rest }, ref) => {
    const [val, setVal] = useState(defaultValue || '');
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

    const getLabelFromName = (source: string): string => {
      return source
        .split(/(?=[A-Z])/)
        .map((str, index) => {
          if (index === 0) {
            return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
          }
          return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
        })
        .join(' ');
    };

    return (
      <Container>
        <StyledInput
          ref={ref}
          id={name}
          isError={Boolean(fieldError)}
          maxWidth={maxWidth}
          min={0}
          name={name}
          isIcon={!!icon}
          onChange={(e) => {
            const newValue = e.target.value;
            setVal(newValue);
            handleChange && handleChange(newValue);
          }}
          required
          value={val}
          {...rest}
        />
        <Label htmlFor={name} isError={Boolean(fieldError)} required={required}>
          {getLabelFromName(name)}
        </Label>
        {icon && <IconContainer>{icon}</IconContainer>}
        <Error>{error}</Error>
      </Container>
    );
  },
);

export default TextField;
