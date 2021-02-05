import React, { forwardRef, useMemo } from 'react';
import { TickIcon } from '../../../icons';
import { getLabelFromName } from '../../../utils';
import { Error } from '../TextField/TextField.styled';
import { Checkmark, CheckboxLabel, StyledInput, CheckboxWrapper } from './Checkbox.styled';
import { CheckboxProps, ICheckboxProps } from './Checkbox.types';

const Checkbox = forwardRef<ICheckboxProps, CheckboxProps>(
  ({ name, required, errors, margin, handleChange, label, ...rest }, ref) => {
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
      <CheckboxWrapper margin={margin}>
        <CheckboxLabel htmlFor={name} required={required}>
          <StyledInput
            ref={ref}
            type="checkbox"
            name={name}
            id={name}
            required={required}
            onChange={(e) => handleChange && handleChange(e.target.checked)}
            {...rest}
          />
          {label || getLabelFromName(name)}
          <Checkmark isError={Boolean(fieldError)}>
            <TickIcon />
          </Checkmark>
        </CheckboxLabel>
        <Error>{error}</Error>
      </CheckboxWrapper>
    );
  },
);

export default Checkbox;
