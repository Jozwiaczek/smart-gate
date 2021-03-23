import styled from 'styled-components';

import { Button } from '../../elements/buttons';

export const StyledButton = styled(Button)(
  ({ theme: { breakpoints, down } }) => `
  max-width: 200px;
  width: 100%;
  margin-left: 10px;
  ${down(breakpoints.sm)} {
    max-width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
`,
);
