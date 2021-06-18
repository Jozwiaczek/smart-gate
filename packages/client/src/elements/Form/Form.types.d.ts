import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

type HTMLForm = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export interface FormProps extends HTMLForm {
  children: ReactNode;
  errors: FieldErrors;
  loading: boolean;
  register: UseFormRegister<FieldValues>;
}

export type ValidationType = 'email' | 'required' | 'password';

interface FormBaseInputProps {
  name: string;
  required?: boolean;
  registerOptions?: RegisterOptions<TFieldValues, TFieldName>;
  validationType: ValidationType;
}
