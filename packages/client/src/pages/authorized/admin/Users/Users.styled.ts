import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  ${({ theme: { breakpoints, up } }) => `
      ${up(breakpoints.lg)} {
        overflow-x: auto;
      }
    `};
`;

export const ListContainer = styled.div`
  height: 100%;
  overflow-x: auto;
  padding-top: 60px;
`;
