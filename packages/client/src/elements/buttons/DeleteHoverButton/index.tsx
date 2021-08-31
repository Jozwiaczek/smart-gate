import { ButtonHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import { TrashIcon } from '../../../icons';
import { StyledButton } from './DeleteHoverButton.styled';

interface DeleteHoverButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

const DeleteHoverButton = ({ disabled }: DeleteHoverButtonProps) => {
  const { t } = useTranslation();

  return (
    <StyledButton data-testid="delete-hover-button" colorVariant="red" disabled={disabled}>
      <p>{t('actions.delete')}</p>
      <TrashIcon />
    </StyledButton>
  );
};

DeleteHoverButton.displayName = 'DeleteHoverButton';

export default DeleteHoverButton;
