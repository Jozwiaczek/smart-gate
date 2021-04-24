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
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
`;

export const ContentWrapper = styled.div<ContentWrapperProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: ${({ illustrationHeight }) => illustrationHeight + 40}px;
  justify-content: flex-start;
  margin-bottom: 40px;
  position: relative;
  width: 100%;
`;
