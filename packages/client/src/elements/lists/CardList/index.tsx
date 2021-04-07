import React, { Children, cloneElement, isValidElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import { routes } from '../../../constants';
import { EditIcon, FiltersIcon } from '../../../icons';
import { ApiList } from '../../../interfaces/api.types';
import { ThemeType } from '../../../theme/Theme';
import { BaseFieldProps, BaseRecordField } from '../../fields/Fields.types';
import {
  CardFieldContainer,
  CardsWrapper,
  EditButton,
  FiltersButton,
  FiltersContainer,
  StyledCard,
  TitleWrapper,
  Wrapper,
} from './CardList.styled';
import { CardListProps } from './CardList.types';

const CardList = ({ children, resource }: CardListProps) => {
  const queryResult = useQuery<ApiList<BaseRecordField>>(`/${resource}`);
  const records = queryResult.data?.data;
  const history = useHistory();
  const { t } = useTranslation();

  const onClickEdit = (id: string) => {
    // TODO: move to user details
    console.log(id);
    history.push(routes.authorized.appBar.admin.USERS);
  };

  return (
    <Wrapper data-testid="cardList">
      <FiltersContainer>
        {/* TODO: add search input */}
        <p>Search</p>
        <FiltersButton colorVariant={ThemeType.dark}>
          <FiltersIcon />
        </FiltersButton>
      </FiltersContainer>
      <CardsWrapper>
        {records?.map((record) => {
          const { id } = record;
          return (
            <StyledCard key={id}>
              <EditButton onClick={() => onClickEdit(id)}>
                <EditIcon />
              </EditButton>
              {Children.map(children, (child) => {
                if (!isValidElement(child)) {
                  return null;
                }

                const { source, asTitle, label, noLabel } = child.props as BaseFieldProps<unknown>;

                if (asTitle) {
                  return <TitleWrapper>{cloneElement(child, { record })}</TitleWrapper>;
                }

                const internalLabel = label || t(`baseApiFields.${source}` as never);

                return (
                  <CardFieldContainer key={`${id}-${source}`}>
                    {!noLabel && <p>{internalLabel}:&nbsp;</p>}
                    {cloneElement(child, { record })}
                  </CardFieldContainer>
                );
              })}
            </StyledCard>
          );
        })}
      </CardsWrapper>
    </Wrapper>
  );
};

CardList.displayName = 'CardList';

export default CardList;
