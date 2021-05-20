import React from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from '../AuthorizedPages.styled';

const History = () => {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t('routes.history.title')}</Title>
      <h2>{t('routes.general.sectionInConstruction')}</h2>
    </>
  );
};

export default History;
