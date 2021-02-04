import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  ReactElement,
  SetStateAction,
} from 'react';
import { FieldErrors } from 'react-hook-form';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  handleChange?: Dispatch<SetStateAction<unknown>>;
  maxWidth?: string;
  errors?: FieldErrors;
  name: string;
  icon?: ReactElement;
  label?: string;
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
