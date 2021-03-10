import styled from 'styled-components';

import { ArrowIcon } from '../../../icons';
import { Card } from '../../index';
import Link from '../../Link';
import { StyledLink, StyledOutLink } from '../../Link/Link.styled';
import { ActionsContainerProps } from './AuthLayout.types';

export const StyledActionsContainer = styled.div<ActionsContainerProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  flex-wrap: wrap;
  flex-direction: ${({ direction }) => direction};

  ${StyledLink}:not(:last-child), ${StyledOutLink}:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const StyledCard = styled(Card)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const CardWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 15px;
`;

export const BackLinkWrapper = styled.div`
  margin-bottom: 10px;
`;

export const BackLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const BackIcon = styled(ArrowIcon)`
  transform: rotate(180deg);
  padding: 1px;
`;
