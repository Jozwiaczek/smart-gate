import styled, { css } from 'styled-components';

import { Button } from '../../../elements';

export const CardsWrapper = styled.div(
  ({ theme: { breakpoints, up, down } }) => css`
    display: grid;
    width: 100%;
    margin-top: 60px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    row-gap: 60px;
    column-gap: 60px;

    ${down(breakpoints.sm)} {
      row-gap: 40px;
    }

    ${up(breakpoints.md)} {
      max-width: 800px;
    }
  `,
);

export const CardButton = styled(Button)(
  ({ theme: { breakpoints, down } }) => css`
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
  ({ theme: { breakpoints, down } }) => css`
    ${down(breakpoints.md)} {
      font-size: 18px;
      font-weight: 400;
    }
  `,
);

export const CardIconWrapper = styled.div(
  ({ theme: { breakpoints, down, palette } }) => css`
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

export const RouteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const RouteTopContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;

export const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const RouteIconWrapper = styled.div`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-left: 21px;
  width: 52px;
`;

export const BackButtonWrapper = styled.div(
  ({ theme: { down, breakpoints } }) => css`
    margin-right: 50px;
    ${down(breakpoints.sm)} {
      margin-bottom: 30px;
    }
  `,
);
