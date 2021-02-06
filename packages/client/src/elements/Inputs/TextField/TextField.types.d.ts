import { DetailedHTMLProps, InputHTMLAttributes, ReactElement } from 'react';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  maxWidth?: string;
  error?: string;
  name: string;
  icon?: ReactElement;
  label?: string;
  validation?: RegisterOptions;
}

export type ITextFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputProps &
  HTMLInputElement;

export interface LabelProps {
  required?: boolean;
  isError?: boolean;
}

export interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  maxWidth?: string;
  isError?: boolean;
  isIcon?: boolean;
}
