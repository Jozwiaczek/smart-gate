import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { BackIcon, StyledTextButton } from './BackButton.styled';

const BackButton = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <StyledTextButton onClick={() => history.goBack()}>
      <BackIcon />
      <b>{t('actions.back')}</b>
    </StyledTextButton>
  );
};

export default BackButton;
