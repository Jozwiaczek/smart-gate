import styled from 'styled-components';

import { Card } from '../../index';
import { StyledLink, StyledOutLink } from '../../Link/Link.styled';
import { ActionsContainerProps } from './CardLayout.types';

export const StyledActionsContainer = styled.div<ActionsContainerProps>`
  align-items: center;
  display: flex;
  flex-direction: ${({ direction }) => direction};
  flex-wrap: wrap;
  height: 100%;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;

  ${StyledLink}:not(:last-child), ${StyledOutLink}:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const StyledCard = styled(Card)`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 15px;
  max-width: 500px;
  text-align: center;
  width: 100%;
`;

export const CardWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledTitle = styled.h1`
  margin: 30px 0 20px;
`;

export const StyledDescription = styled.p`
  color: ${({ theme: { palette } }) => palette.text.secondary};
  margin: 30px 0;
`;
