import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface CheckboxProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  margin?: string;
}

export type ICheckboxProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputProps &
  HTMLInputElement;

export interface CheckboxLabelProps {
  required?: boolean;
}

export interface CheckmarkProps {
  isError?: boolean;
}

export interface CheckboxWrapperProps {
  margin?: string;
}
