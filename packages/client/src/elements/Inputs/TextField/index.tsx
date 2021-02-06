import React, { forwardRef } from 'react';
import { getLabelFromName } from '../../../utils';
import { Container, Error, IconContainer, Label, StyledInput } from './TextField.styled';
import { ITextFieldProps, TextFieldProps } from './TextField.types';

const TextField = forwardRef<ITextFieldProps, TextFieldProps>(
  ({ error, name, label, icon, required, maxWidth, ...rest }, ref) => (
    <Container>
      <StyledInput
        ref={ref}
        id={name}
        isError={Boolean(error)}
        maxWidth={maxWidth}
        name={name}
        isIcon={!!icon}
        required={required}
        {...rest}
      />
      <Label htmlFor={name} isError={Boolean(error)} required={required}>
        {label || getLabelFromName(name)}
      </Label>
      {icon && <IconContainer>{icon}</IconContainer>}
      <Error>{error}</Error>
    </Container>
  ),
);

export default TextField;
