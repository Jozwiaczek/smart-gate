import styled from 'styled-components';

import { Button } from '../../../elements';

export const CardsWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => `
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  gap: 60px;
  margin-top: 60px;
  ${down(breakpoints.md)} {
    gap: 30px;
  }
`,
);

export const CardButton = styled(Button)(
  ({ theme: { breakpoints, down } }) => `
  width: 300px;
  padding: 0;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  ${down(breakpoints.sm)} {
    width: 100%;
    height: 75px;
    flex-direction: row;
    text-align: left;
    justify-content: flex-start;
    padding-left: 20px;
  }
`,
);

export const CardButtonLabel = styled.h4(
  ({ theme: { breakpoints, down } }) => `
  ${down(breakpoints.md)} {
    font-size: 18px;
    font-weight: 400;
  }
`,
);

export const Title = styled.h1(
  ({ theme: { breakpoints, down } }) => `
  ${down(breakpoints.sm)} {
    text-align: center;
  }
`,
);

export const IconWrapper = styled.div(
  ({ theme: { breakpoints, down, palette } }) => `
  font-size: 36px;
  width: 32px;
  color: ${palette.text.primary};
  margin-bottom: 10px;
  
  ${down(breakpoints.sm)} {
    width: 22px;
    margin-bottom: 0;
    margin-right: 12px;
  }
`,
);
