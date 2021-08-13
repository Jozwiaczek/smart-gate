import { useContext } from 'react';

import { ConfirmDialogContext } from '../providers/ConfirmDialogProvider';
import { OpenConfirmDialogOptions } from '../providers/ConfirmDialogProvider/ConfirmDialogProvider.types';

const useConfirmDialog = (options: OpenConfirmDialogOptions) => {
  const { open } = useContext(ConfirmDialogContext);
  return open(options);
};

export default useConfirmDialog;
