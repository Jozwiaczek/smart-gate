import styled from 'styled-components';

export const PaperPlaneWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => `
  margin-top: 50px;
  max-height: 250px;
  ${down(breakpoints.sm)} {
    max-width: 150px;
  }
`,
);
