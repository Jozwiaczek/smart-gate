import styled, { css } from 'styled-components';

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

const baseSectionsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const WideSectionsWrapper = styled.div`
  ${baseSectionsWrapper};
  width: 400px;
`;

export const FitSectionsWrapper = styled.div`
  ${baseSectionsWrapper};
  width: 300px;
`;

export const Wrapper = styled.div``;
