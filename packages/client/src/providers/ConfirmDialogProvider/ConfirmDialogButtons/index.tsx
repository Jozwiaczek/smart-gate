import React, { cloneElement, isValidElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/elements';
import { ThemeType } from 'src/theme/Theme';

import { TrashIcon } from '../../../icons';
import { ActionButtonProps } from '../ConfirmDialogProvider.types';
import { StyledCancelIcon } from './ConfirmDialogButtons.styled';

export const ConfirmButton = ({ callback, overwrittenBtn }: ActionButtonProps) => {
  const { t } = useTranslation();

  if (overwrittenBtn) {
    if (isValidElement(overwrittenBtn)) {
      return cloneElement(overwrittenBtn, { onClick: callback });
    }
  }

  return (
    <Button colorVariant="red" fullWidth onClick={callback}>
      {t('actions.delete')}
      <TrashIcon />
    </Button>
  );
};

export const CancelButton = ({ callback, overwrittenBtn }: ActionButtonProps) => {
  const { t } = useTranslation();

  if (overwrittenBtn) {
    if (isValidElement(overwrittenBtn)) {
      return cloneElement(overwrittenBtn, { onClick: callback });
    }
  }

  return (
    <Button colorVariant={ThemeType.dark} fullWidth onClick={callback}>
      {t('actions.cancel')}
      <StyledCancelIcon />
    </Button>
  );
};
