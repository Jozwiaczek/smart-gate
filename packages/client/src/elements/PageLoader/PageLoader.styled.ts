import styled from 'styled-components';

import { LoaderBoxProps } from './PageLoader.types';

export const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.default};
  svg {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export const LoaderBox = styled.div<LoaderBoxProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;
  margin-bottom: 100px;
`;

export const LoaderBoxItem = styled.div`
  width: 1rem;
  height: 1rem;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.primary.main};
`;
