import { useTranslation } from 'react-i18next';

import { TrashIcon } from '../../../icons';
import { StyledButton } from './DeleteHoverButton.styled';
import { DeleteHoverButtonProps } from './DeleteHoverButton.types';

const DeleteHoverButton = ({ disabled, ...rest }: DeleteHoverButtonProps) => {
  const { t } = useTranslation();

  return (
    <StyledButton
      data-testid="delete-hover-button"
      {...rest}
      colorVariant="red"
      disabled={disabled}
    >
      <p>{t('actions.delete')}</p>
      <TrashIcon />
    </StyledButton>
  );
};

DeleteHoverButton.displayName = 'DeleteHoverButton';

export default DeleteHoverButton;
