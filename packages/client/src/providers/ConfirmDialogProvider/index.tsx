import React, { createContext, useCallback, useMemo, useState } from 'react';

import { Dialog } from '../../elements';
import { CancelButton, ConfirmButton } from './ConfirmDialogButtons';
import { ConfirmDialogButtonsWrapper } from './ConfirmDialogButtons/ConfirmDialogButtons.styled';
import {
  ConfirmDialogContextValue,
  ConfirmDialogProviderProps,
  OpenConfirmDialogOptions,
} from './ConfirmDialogProvider.types';

export const ConfirmDialogContext = createContext<ConfirmDialogContextValue>({
  open: () => () => {},
});

const ConfirmDialogProvider = ({ children }: ConfirmDialogProviderProps) => {
  const [isOpen, setOpen] = useState(false);
  const [optionsInternal, setOptionsInternal] = useState<OpenConfirmDialogOptions>();

  const close = () => {
    setOpen(false);
  };

  const open = useCallback(
    (options: OpenConfirmDialogOptions) => () => {
      if (!isOpen) {
        setOptionsInternal(options);
        setOpen(true);
      }
    },
    [isOpen],
  );

  const confirm = () => {
    optionsInternal?.onConfirm();
    close();
  };

  const cancel = () => {
    optionsInternal?.onCancel && optionsInternal.onCancel();
    close();
  };

  const value: ConfirmDialogContextValue = useMemo(
    () => ({
      open,
    }),
    [open],
  );

  return (
    <>
      <ConfirmDialogContext.Provider value={value}>{children}</ConfirmDialogContext.Provider>
      <Dialog
        isOpen={isOpen}
        close={cancel}
        title={optionsInternal?.title}
        description={optionsInternal?.description}
      >
        <ConfirmDialogButtonsWrapper>
          <CancelButton callback={cancel} overwrittenBtn={optionsInternal?.cancelButton} />
          <ConfirmButton callback={confirm} overwrittenBtn={optionsInternal?.confirmButton} />
        </ConfirmDialogButtonsWrapper>
      </Dialog>
    </>
  );
};

export default ConfirmDialogProvider;
