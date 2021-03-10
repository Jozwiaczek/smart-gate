import styled from 'styled-components';

import { Button } from '../../elements';

export const Title = styled.h1(
  ({ theme: { breakpoints, down } }) => `
  margin: 30px 0;
  ${down(breakpoints.xs)} {
    font-size: 40px;
  }
`,
);

export const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;
