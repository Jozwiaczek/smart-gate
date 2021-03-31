import styled from 'styled-components';

import { Button } from '../../../../elements';

export const CardsWrapper = styled.div(
  ({ theme: { breakpoints, up } }) => `
  display: grid;
  gap: 60px;
  width: 100%;
  margin-top: 60px;
  grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
  
  ${up(breakpoints.md)} {
    max-width: 800px;
  }
`,
);

export const CardButton = styled(Button)(
  ({ theme: { breakpoints, down } }) => `
  width: 100%;
  padding: 0;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  ${down(breakpoints.md)} {
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
  
  ${down(breakpoints.md)} {
    width: 22px;
    margin-bottom: 0;
    margin-right: 12px;
  }
`,
);
