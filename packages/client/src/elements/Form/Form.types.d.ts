import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from 'react';
import { FieldErrors } from 'react-hook-form';
import { FieldElement, FieldName, Ref } from 'react-hook-form/dist/types/fields';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

type HTMLForm = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export interface FormProps extends HTMLForm {
  children: ReactNode;
  errors: FieldErrors;
  loading: boolean;
  register<TFieldElement extends FieldElement<TFieldValues>>(
    rules?: RegisterOptions,
  ): (ref: (TFieldElement & Ref) | null) => void;
  register(name: FieldName<TFieldValues>, rules?: RegisterOptions): void;
  register<TFieldElement extends FieldElement<TFieldValues>>(
    ref: (TFieldElement & Ref) | null,
    rules?: RegisterOptions,
  ): void;
}
