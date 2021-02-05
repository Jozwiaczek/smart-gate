import { DetailedHTMLProps, Dispatch, InputHTMLAttributes, SetStateAction } from 'react';
import { FieldErrors } from 'react-hook-form';

export interface CheckboxProps {
  name: string;
  label: string;
  handleChange?: Dispatch<SetStateAction<unknown>>;
  errors?: FieldErrors;
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
