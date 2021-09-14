interface BaseEmailTemplatesProps {
  clientUrl: string;
}

interface WelcomeTemplateProps extends BaseEmailTemplatesProps {
  link: string;
}

interface PasswordRecoveryTemplateProps extends BaseEmailTemplatesProps {
  firstName: string;
  link: string;
}

interface PasswordChangedTemplateProps extends BaseEmailTemplatesProps {
  firstName: string;
}
