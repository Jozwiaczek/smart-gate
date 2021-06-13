import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { TickIcon } from '../../../icons';
import { getLabelFromSource } from '../../../utils';
import { Error } from '../TextInput/TextInput.styled';
import { CheckboxLabel, CheckboxWrapper, Checkmark, StyledInput } from './Checkbox.styled';
import { CheckboxProps } from './Checkbox.types';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, required, error, margin, label, ...rest }, ref) => {
    const { t } = useTranslation();

    return (
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
          {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
          {(label || name) && <p>{t(label as never) || getLabelFromSource(name!)}</p>}
          <Checkmark isError={Boolean(error)}>
            <TickIcon />
          </Checkmark>
        </CheckboxLabel>
        <Error>{error}</Error>
      </CheckboxWrapper>
    );
  },
);

export default Checkbox;
