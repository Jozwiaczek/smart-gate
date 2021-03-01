import { DetailedHTMLProps, InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  maxWidth?: string;
  error?: string;
  name: string;
  icon?: ReactElement;
  label?: string;
  validation?: RegisterOptions;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
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

export interface InputAdornmentProps {
  position: 'start' | 'end';
}

export interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  maxWidth?: string;
  isStartAdornment?: boolean;
  isEndAdornment?: boolean;
  showPassword?: boolean;
}

export interface TextFieldContainerProps {
  isPasswordMasked?: boolean;
}
