export interface RegistrationInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationParams {
  code: string;
  email: string;
}
