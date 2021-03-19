export interface WelcomeTemplateProps extends BaseEmailTemplatesProps {
  firstName: string;
  link: string;
}

export interface PasswordRecoveryTemplateProps extends BaseEmailTemplatesProps {
  firstName: string;
  link: string;
}

export interface BaseEmailTemplatesProps {
  clientUrl: string;
}
