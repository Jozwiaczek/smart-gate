import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { Checkbox, TextField } from '../Inputs';
import { FormProps } from './Form.types';

const formInputs: Array<ReactNode> = [Checkbox, TextField];
const isFormInput = (child: ReactElement) => formInputs.includes(child.type);

const Form = ({ children, errors, register, loading, onSubmit, ...rest }: FormProps) => (
  <form onSubmit={onSubmit} noValidate {...rest}>
    {Children.map(children, (child) => {
      if (isValidElement(child) && isFormInput(child)) {
        const { name, required, validation } = child.props;
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

        const validationRules = useMemo((): RegisterOptions => {
          const internalRules = validation;
          if (required) {
            internalRules.required = 'Required';
          }

          return internalRules;
        }, [required, validation]);

        return cloneElement(child, {
          error,
          ref: register(validationRules),
          disabled: Boolean(loading),
        });
      }

      return child;
    })}
  </form>
);

export default Form;
