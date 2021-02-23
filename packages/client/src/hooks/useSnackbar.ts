import { useContext } from 'react';

import { SnackbarContext } from '../providers/SnackbarProvider';
import { ShowSnackbarProps } from '../providers/SnackbarProvider/SnackbarProvider.types';

const useSnackbar = (): ((snackbarProps: ShowSnackbarProps) => void) => {
  const { showSnackbar } = useContext(SnackbarContext);
  return showSnackbar;
};

export default useSnackbar;
