import React, { Children, cloneElement, isValidElement } from 'react';
import { useQuery } from 'react-query';

import { EditIcon } from '../../icons';
import { ApiList } from '../../interfaces/api.types';
import { BaseRecordField } from '../fields/Fields.types';
import {
  CardsWrapper,
  FiltersContainer,
  StyledCard,
  StyledFiltersIcon,
  StyledIconButton,
  TitleWrapper,
  Wrapper,
} from './CardList.styled';
import { CardListProps } from './CardList.types';

const CardList = ({ children, resource }: CardListProps) => {
  const queryResult = useQuery<ApiList<BaseRecordField>>(`/${resource}`);
  const records = queryResult.data?.data;

  return (
    <Wrapper data-testid="cardList">
      <FiltersContainer>
        <p>Search</p>
        <StyledFiltersIcon />
      </FiltersContainer>
      <CardsWrapper>
        {records?.map((record) => (
          <StyledCard key={record.id}>
            <StyledIconButton>
              <EditIcon />
            </StyledIconButton>
            {Children.map(children, (child) => {
              if (!isValidElement(child)) {
                return null;
              }

              const { source, asTitle } = child.props;

              if (asTitle) {
                return <TitleWrapper>{cloneElement(child, { record })}</TitleWrapper>;
              }

              return <div key={`${record.id}-${source}`}>{cloneElement(child, { record })}</div>;
            })}
          </StyledCard>
        ))}
      </CardsWrapper>
    </Wrapper>
  );
};

CardList.displayName = 'CardList';

export default CardList;
