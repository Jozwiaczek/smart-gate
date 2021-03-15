import mjml2html from 'mjml';

const welcomeTemplate = ({ firstName = '' }) => {
  const { html, errors } = mjml2html(
    `
    <mjml>
      <mj-head>
        <mj-attributes>
          <mj-text font-family="Roboto, sans-serif" align="center" font-size="16px" color='#FFF'/>
          <mj-section background-color="#30444E" border-radius='12px'/>
          <mj-button background-color="#3ED598" color="#22343C" font-size="16px" border-radius='12px' />
        </mj-attributes>
        <mj-style inline="inline">
          .body-section { -webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); -moz-box-shadow: 1px
          4px 11px 0px rgba(0, 0, 0, 0.15); box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); }
        </mj-style>
      </mj-head>
      <mj-body>
        <mj-section padding-bottom="20px" padding-top="10px" css-class="body-section">
          <mj-column>
            <mj-image src='${process.env.CLIENT_URL}/email-logo.png' height='250px' width='250px' alt="header image" />
            <mj-text padding="10px 25px" font-size="22px">
              Welcome ${firstName}!
            </mj-text>
            <mj-button href="https://mjml.io" padding="40px 0 0 0" width='150px' height='44px' >
              Log in
            </mj-button>
            <mj-text font-size="14px" padding="40px 0 20px">Best, <br /> The Smart Gate Team
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
