import styled from 'styled-components';

import { Card } from '../../index';
import { StyledLink, StyledOutLink } from '../../Link/Link.styled';
import { ActionsContainerProps } from './AuthLayout.types';

export const StyledActionsContainer = styled.div<ActionsContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  flex-wrap: wrap;
  flex-direction: ${({ direction }) => direction};

  ${StyledLink}:not(:last-child), ${StyledOutLink}:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const StyledCard = styled(Card)`
  max-width: 500px;
  width: 100%;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
