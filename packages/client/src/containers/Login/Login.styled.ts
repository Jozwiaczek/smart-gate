import styled from 'styled-components';

import { Button, Card } from '../../elements';
import { EmailIcon } from '../../icons';

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  height: 50px;
`;

export const StyledCard = styled(Card)`
  max-width: 500px;
  width: 100%;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ActionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
`;

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

export const StyledEmailIcon = styled(EmailIcon)`
  color: ${({ theme }) => theme.palette.colors.orange};
`;
