import React, { Children, cloneElement, isValidElement, ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import {
  hasLetter,
  hasLowercaseLetter,
  hasNumeric,
  hasSpecialChar,
  hasUppercaseLetter,
  isValidEmail,
  isValidLength,
} from '../../utils/validations';
import { Checkbox, TextInput } from '../inputs';
import { FormProps, ValidationType } from './Form.types';

// Every input in app which is used with Form component must be declared here
const formInputs: Array<ReactNode> = [Checkbox, TextInput];
const isFormInput = (child: ReactElement) => formInputs.includes(child.type);

const Form = ({ children, errors, register, loading, onSubmit, ...rest }: FormProps) => {
  const { t } = useTranslation();

  const adjustChildrenRecursively = (childrenList: ReactNode): ReactNode =>
    Children.map(childrenList, (child) => {
      if (isValidElement(child)) {
        if (isFormInput(child)) {
          const { name, required, validation = {}, validationType } = child.props;
          const fieldError = errors && errors[name];
          const internalValidationType: ValidationType = validationType;

          if (required || internalValidationType === 'required') {
            validation.required = t('form.validation.required');
          }

          if (internalValidationType === 'email') {
            validation.validate = (value: string) =>
              isValidEmail(value) || t('form.validation.invalidEmail');
          }

          if (internalValidationType === 'password') {
            validation.validate = (value: string) => {
              const basePasswordErrorMsg = t('form.validation.basePassword');
              if (!isValidLength(value)) {
                return `${basePasswordErrorMsg} 8 ${t('form.validation.characters')}`;
              }
              if (!hasLetter(value)) {
                return `${basePasswordErrorMsg} 1 ${t('form.validation.letter')}`;
              }
              if (!hasLowercaseLetter(value)) {
                return `${basePasswordErrorMsg} 1 ${t('form.validation.lowercaseLetter')}`;
              }
              if (!hasUppercaseLetter(value)) {
                return `${basePasswordErrorMsg} 1 ${t('form.validation.uppercaseLetter')}`;
              }
              if (!hasNumeric(value)) {
                return `${basePasswordErrorMsg} 1 ${t('form.validation.number')}`;
              }
              if (!hasSpecialChar(value)) {
                return `${basePasswordErrorMsg} 1 ${t('form.validation.specialCharacter')}`;
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
