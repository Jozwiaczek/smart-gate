import styled, { css } from 'styled-components';

interface RowSectionProps {
  isCameraMode: boolean;
}

export const RowSection = styled.div<RowSectionProps>(
  ({ isCameraMode, theme: { breakpoints, down } }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 100px;
    margin: ${isCameraMode ? '32px 0 20px' : '80px 0 20px'};

    ${down(breakpoints.md)} {
      gap: 0;
      align-items: center;
      flex-direction: column-reverse;
      & > :not(:first-child) {
        margin-bottom: ${isCameraMode ? '16px' : '50px'};
      }
    }
  `,
);
