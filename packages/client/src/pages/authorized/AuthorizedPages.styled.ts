import styled from 'styled-components';

export const Title = styled.h1(
  ({ theme: { breakpoints, down } }) => `
  ${down(breakpoints.sm)} {
    text-align: center;
  }
`,
);
