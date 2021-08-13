import React, { createContext, useState } from 'react';

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

  const open = (options: OpenConfirmDialogOptions) => () => {
    if (!isOpen) {
      setOptionsInternal(options);
      setOpen(true);
    }
  };

  const confirm = () => {
    optionsInternal?.onConfirm();
    close();
  };

  const cancel = () => {
    optionsInternal?.onCancel && optionsInternal.onCancel();
    close();
  };

  return (
    <>
      <ConfirmDialogContext.Provider value={{ open }}>{children}</ConfirmDialogContext.Provider>
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
