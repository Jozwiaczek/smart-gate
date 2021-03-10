import React, { Children, cloneElement, isValidElement, ReactElement, ReactNode } from 'react';

import {
  hasLetter,
  hasLowercaseLetter,
  hasNumeric,
  hasSpecialChar,
  hasUppercaseLetter,
  isValidEmail,
  isValidLength,
} from '../../utils/validations';
import { Checkbox, TextField } from '../inputs';
import { FormProps, ValidationType } from './Form.types';

// Every input in app which is used with Form component must be declared here
const formInputs: Array<ReactNode> = [Checkbox, TextField];
const isFormInput = (child: ReactElement) => formInputs.includes(child.type);

const Form = ({ children, errors, register, loading, onSubmit, ...rest }: FormProps) => {
  const adjustChildrenRecursively = (childrenList: ReactNode): ReactNode =>
    Children.map(childrenList, (child) => {
      if (isValidElement(child)) {
        if (isFormInput(child)) {
          const { name, required, validation = {}, validationType } = child.props;
          const fieldError = errors && errors[name];
          const internalValidationType: ValidationType = validationType;

          if (required || internalValidationType === 'required') {
            validation.required = 'Required';
          }

          if (internalValidationType === 'email') {
            validation.validate = (value: string) =>
              isValidEmail(value) || 'Invalid email address.';
          }

          if (internalValidationType === 'password') {
            validation.validate = (value: string) => {
              const basePasswordErrorMsg = 'Password must contain at least';
              if (!isValidLength(value)) {
                return `${basePasswordErrorMsg} 8 characters.`;
              }
              if (!hasLetter(value)) {
                return `${basePasswordErrorMsg} 1 letter.`;
              }
              if (!hasLowercaseLetter(value)) {
                return `${basePasswordErrorMsg} 1 lowercase letter.`;
              }
              if (!hasUppercaseLetter(value)) {
                return `${basePasswordErrorMsg} 1 uppercase letter.`;
              }
              if (!hasNumeric(value)) {
                return `${basePasswordErrorMsg} 1 number.`;
              }
              if (!hasSpecialChar(value)) {
                return `${basePasswordErrorMsg} 1 special character.`;
              }
            };
          }

          return cloneElement(child, {
            error: fieldError?.message,
            ref: register(validation),
            disabled: Boolean(loading),
          });
        }

        // Recursive function invoke for nested elements
        if (child.props.children) {
          return cloneElement(child, {
            ...child.props,
            children: adjustChildrenRecursively(child.props.children),
          });
        }
      }

      return child;
    });

  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }} noValidate {...rest}>
      {adjustChildrenRecursively(children)}
    </form>
  );
};

export default Form;
