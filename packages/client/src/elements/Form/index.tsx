import React, { Children, cloneElement, isValidElement, ReactElement, ReactNode } from 'react';

import { Checkbox, TextField } from '../inputs';
import { FormProps } from './Form.types';

const formInputs: Array<ReactNode> = [Checkbox, TextField];
const isFormInput = (child: ReactElement) => formInputs.includes(child.type);

const Form = ({ children, errors, register, loading, onSubmit, ...rest }: FormProps) => (
  <form onSubmit={onSubmit} style={{ width: '100%' }} noValidate {...rest}>
    {Children.map(children, (child) => {
      if (isValidElement(child)) {
        if (isFormInput(child)) {
          const { name, required, validation = {} } = child.props;
          const fieldError = errors && errors[name];

          let error;
          if (fieldError) {
            if (fieldError.type === 'required') {
              error = 'Required';
            }
            error = fieldError.message;
          }

          if (required) {
            validation.required = 'Required';
          }

          // Form inputs
          return cloneElement(child, {
            error,
            ref: register(validation),
            disabled: Boolean(loading),
          });
        }

        // Other children
        return child;
      }
    })}
  </form>
);

export default Form;
