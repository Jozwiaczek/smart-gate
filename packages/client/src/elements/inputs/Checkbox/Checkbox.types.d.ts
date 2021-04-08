import { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  error?: string;
  required?: boolean;
  margin?: string;
}

export interface CheckboxLabelProps {
  required?: boolean;
}

export interface CheckmarkProps {
  isError?: boolean;
}

export interface CheckboxWrapperProps {
  margin?: string;
}
