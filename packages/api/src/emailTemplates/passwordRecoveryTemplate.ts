import mjml2html from 'mjml';

const passwordRecoveryTemplate = ({
  firstName,
  link,
  clientUrl,
}: PasswordRecoveryTemplateProps) => {
  const { html, errors } = mjml2html(
    `
    <mjml>
      <mj-head>
        <mj-attributes>
          <mj-text
            font-family="Roboto, sans-serif"
            align="center"
            font-size="16px"
            color="#FFF"
            line-height="19px"
          />
          <mj-button background-color="#3ED598" color="#22343C" font-size="16px" border-radius="12px" />
        </mj-attributes>
      </mj-head>
      <mj-body>
        <mj-section border-radius="12px 12px 0 0" background-color="#22343C" padding="0">
          <mj-column>
            <mj-image
              src="${clientUrl}/email-images/sg-logo.png"
              height="140px"
              width="140px"
              alt="header image"
            />
          </mj-column>
        </mj-section>
        <mj-section
          padding-bottom="20px"
          padding-top="10px"
          border-radius="0 0 12px 12px"
          background-color="#30444E"
        >
          <mj-column>
            <mj-text padding="50px 25px" font-size="40px" line-height="47px">
              Password Recovery
            </mj-text>
            <mj-image
              src="${clientUrl}/email-images/shield-lock.png"
              height="141px"
              width="150px"
              alt="shield lock image"
            />
            <mj-text font-size="24px" padding='50px 0 10px'> Hi <b>${firstName}</b>, </mj-text>
            <mj-text>
              We’re sending you this email because you<br/> requested a password reset. Click on the<br/> button to create a new password:
            </mj-text>
            <mj-button href="${link}" padding="40px 0 40px" width="240px" height="45px">
              Set a new password
            </mj-button>
            <mj-text>
              If you didn't request a password reset, you<br/> can ignore this email. Your password will<br/> not be changed.
            </mj-text>
            <mj-text font-size="14px" color="#96A7AF" padding="70px 0 0"
              >Best, <br />
              The Smart Gate Team
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `,
    {},
  );

  if (!html || errors.length) {
    errors.forEach((e) => console.error(e));
    throw new Error('Failed to generate html.');
  }

  return html;
};

export default passwordRecoveryTemplate;
