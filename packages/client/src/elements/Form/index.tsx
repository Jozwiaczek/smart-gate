import React, { Children, cloneElement, isValidElement, ReactElement, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
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
import { FormBaseInputProps, FormProps, ValidationType } from './Form.types';

// Every input in the app, which is used with Form component must be declared here
const formInputs: Array<ReactNode> = [Checkbox, TextInput];
const isFormInput = (child: ReactElement) => formInputs.includes(child.type);

const Form = ({ children, errors, register, loading, onSubmit, ...rest }: FormProps) => {
  const { t } = useTranslation();

  const adjustChildrenRecursively = (childrenList: ReactNode): ReactNode =>
    Children.map(childrenList, (child) => {
      if (isValidElement(child)) {
        if (isFormInput(child)) {
          const {
            name,
            required,
            registerOptions = {},
            validationType,
          } = child.props as FormBaseInputProps;
          const fieldError = errors && (errors[name] as FieldError | undefined);
          const internalValidationType: ValidationType = validationType;

          if (required || internalValidationType === 'required') {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            registerOptions.required = t('form.validation.required') as string;
          }

          if (internalValidationType === 'email') {
            registerOptions.validate = (value: string) =>
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
              isValidEmail(value) || (t('form.validation.invalidEmail') as string);
          }

          if (internalValidationType === 'password') {
            registerOptions.validate = (value: string) => {
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
              return true;
            };
          }

          return cloneElement(child, {
            error: fieldError?.message,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
            ...register(name, registerOptions),
            disabled: Boolean(loading),
          });
        }

        // Recursive function invoke for nested elements
        if (child.props.children) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          return cloneElement(child, {
            ...child.props,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
