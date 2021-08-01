import mjml2html from 'mjml';

const welcomeTemplate = ({ link, clientUrl }: WelcomeTemplateProps) => {
  const { html, errors } = mjml2html(
    `
    <mjml>
      <mj-head>
        <mj-attributes>
          <mj-text font-family="Roboto, sans-serif" align="center" font-size="16px" color='#FFF' line-height='19px'/>
          <mj-button background-color="#3ED598" color="#22343C" font-size="16px" border-radius='12px' />
        </mj-attributes>
      </mj-head>
      <mj-body>
        <mj-section border-radius='12px 12px 0 0' background-color="#22343C" padding='0'>
          <mj-column>
            <mj-image src='${clientUrl}/email-images/sg-logo.png' height='140px' width='140px' alt="header image" />
          </mj-column>
        </mj-section>
        <mj-section padding-bottom="20px" padding-top="10px" border-radius='0 0 12px 12px' background-color="#30444E">
          <mj-column>
            <mj-text padding="50px 25px" font-size="40px" line-height='47px'>
              You’ve been invited <br/> to <b>Smart Gate</b>!
            </mj-text>
            <mj-image src='${clientUrl}/email-images/paper-plane.png' height='160px' width='160px' alt="paper plane image" />
            <mj-text font-size="24px">
            Hi,
            </mj-text>
            <mj-text>
            It’s look like that administrator invites you to group<br/> in Smart Gate system. Click on the button to<br/> create your account.
            </mj-text>
            <mj-button href="${link}" padding="40px 0 0 0" width='240px' height='45px'>
              Create Your Account
            </mj-button>
            <mj-text font-size="14px" color='#96A7AF' padding="70px 0 0">Best, <br /> The Smart Gate Team
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

export default welcomeTemplate;
