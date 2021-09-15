import React from 'react';
import { useTranslation } from 'react-i18next';

import { NoDataCard, StyledNoDataIcon, Wrapper } from './NoData.styled';

const NoData = ({ label }: NoDataProps) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <NoDataCard>
        <h2>{t(label as never) ?? t('lists.general.noData')}</h2>
        <StyledNoDataIcon />
      </NoDataCard>
    </Wrapper>
  );
};

export default NoData;
