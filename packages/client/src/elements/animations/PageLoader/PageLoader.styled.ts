import styled from 'styled-components';

import { LoaderBoxProps } from './PageLoader.types';

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.default};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: fixed;
  width: 100%;
  svg {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export const LoaderBox = styled.div<LoaderBoxProps>`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: ${({ size }) => size}rem;
  justify-content: center;
  margin-bottom: 100px;
  width: ${({ size }) => size}rem;
`;

export const LoaderBoxItem = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  height: 1rem;
  width: 1rem;
`;

export const LoadingLetter = styled.span`
  display: inline-block;
  opacity: 0;
  overflow: hidden;
  transform-origin: 50% 100%;
`;

export const LoadingLabel = styled.h2`
  letter-spacing: 5px;
`;
