import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  ${({ theme: { breakpoints, up } }) => `
      ${up(breakpoints.lg)} {
        overflow-x: auto;
      }
    `};
`;

export const ListContainer = styled.div`
  padding-top: 60px;
  height: 100%;
  overflow-x: auto;
`;

export const CreateButtonContainer = styled.div`
  position: absolute;
  right: 0;
`;
