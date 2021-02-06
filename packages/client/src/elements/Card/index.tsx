import React from 'react';
import { Wrapper } from './Card.styled';
import { CardProps } from './Card.types';

const Card = ({ children, minWidth = '100%' }: CardProps) => (
  <Wrapper minWidth={minWidth}>{children}</Wrapper>
);

export default Card;
