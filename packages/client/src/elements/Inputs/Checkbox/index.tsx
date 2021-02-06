import React, { forwardRef } from 'react';

import { TickIcon } from '../../../icons';
import { getLabelFromName } from '../../../utils';
import { Error } from '../TextField/TextField.styled';
import { CheckboxLabel, CheckboxWrapper, Checkmark, StyledInput } from './Checkbox.styled';
import { CheckboxProps, ICheckboxProps } from './Checkbox.types';

const Checkbox = forwardRef<ICheckboxProps, CheckboxProps>(
  ({ name, required, error, margin, label, ...rest }, ref) => (
    <CheckboxWrapper margin={margin}>
      <CheckboxLabel htmlFor={name} required={required}>
        <StyledInput
          ref={ref}
          type="checkbox"
          name={name}
          id={name}
          required={required}
          {...rest}
        />
        {label || getLabelFromName(name)}
        <Checkmark isError={Boolean(error)}>
          <TickIcon />
        </Checkmark>
      </CheckboxLabel>
      <Error>{error}</Error>
    </CheckboxWrapper>
  ),
);

export default Checkbox;
