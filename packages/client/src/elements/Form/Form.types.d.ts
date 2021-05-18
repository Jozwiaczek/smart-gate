import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type HTMLForm = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export interface FormProps extends HTMLForm {
  children: ReactNode;
  errors: FieldErrors;
  loading: boolean;
  register: UseFormRegister<FieldValues>;
}

export type ValidationType = 'email' | 'required' | 'password';

interface Validation {
  [key: string]: string | ((value: string) => boolean | string);
}

interface FormBaseInputProps {
  name: string;
  required?: boolean;
  validation: Validation;
  validationType: ValidationType;
}
