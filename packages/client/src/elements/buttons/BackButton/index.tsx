import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import TextButton from '../TextButton';
import { BackIcon } from './BackButton.styled';

const BackButton = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <TextButton onClick={() => history.goBack()}>
      <BackIcon />
      <b>{t('actions.back')}</b>
    </TextButton>
  );
};

export default BackButton;
