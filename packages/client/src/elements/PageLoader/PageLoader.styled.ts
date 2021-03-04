import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const LoaderBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 17rem;
  height: 17rem;
`;

export const LoaderBoxItem = styled.div`
  width: 1rem;
  height: 1rem;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.primary.main};
`;
