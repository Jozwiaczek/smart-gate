import styled from 'styled-components';

import { ContentWrapperProps, DescriptionProps } from './PageNotFound.types';

export const Title = styled.h2`
  font-weight: 400;
  margin-bottom: 40px;
`;

export const Description = styled.h5<DescriptionProps>`
  color: ${({ theme: { palette } }) => palette.text.secondary};
  font-weight: 400;
  position: absolute;
  top: ${({ illustrationHeight }) => illustrationHeight - illustrationHeight * 0.1}px;
`;

export const IllustrationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  flex-direction: column;
`;

export const ContentWrapper = styled.div<ContentWrapperProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: ${({ illustrationHeight }) => illustrationHeight + 40}px;
  margin-bottom: 40px;
`;
