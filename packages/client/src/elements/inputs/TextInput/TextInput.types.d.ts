import { InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

import { ValidationType } from '../../Form/Form.types';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  maxWidth?: string;
  error?: string;
  name: string;
  icon?: ReactElement;
  label?: string;
  registerOptions?: RegisterOptions;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  validationType?: ValidationType;
}

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
  isError?: boolean;
}

export interface TextInputContainerProps {
  isPasswordMasked?: boolean;
}
