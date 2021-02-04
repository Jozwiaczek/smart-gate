import styled from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { sizes, palette } }) => `
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: ${palette.boxShadow};
  border-radius: ${sizes.borderRadius};
  padding: 50px;
`,
);
