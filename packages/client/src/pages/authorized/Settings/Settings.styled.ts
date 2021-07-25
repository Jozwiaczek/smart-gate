import styled, { css } from 'styled-components';

import { ITheme } from '../../../theme/Theme';

export const SectionsWrapper = styled.div(
  ({ theme: { down, breakpoints } }) => css`
    margin-top: 60px;
    display: flex;
    gap: 100px;
    flex-wrap: wrap;

    ${down(breakpoints.sm)} {
      justify-content: center;
    }

    ${down(breakpoints.lg)} {
      gap: 50px;
    }
  `,
);

const baseSectionsWrapper = ({ theme: { down, breakpoints } }: { theme: ITheme }) => css`
  display: flex;
  flex-direction: column;
  gap: 50px;

  ${down(breakpoints.md)} {
    width: 100%;
  }
`;

export const WideSectionsWrapper = styled.section`
  ${baseSectionsWrapper};
  width: 400px;
`;

export const FitSectionsWrapper = styled.section`
  ${baseSectionsWrapper};
  width: 300px;
`;
