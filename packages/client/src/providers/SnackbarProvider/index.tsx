import React, { createContext, useRef, useState } from 'react';

import { Snackbar } from '../../elements';
import { SnackbarSeverity } from '../../elements/Snackbar/Snackbar.types';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import getDisplayDuration from './getDisplayDuration';
import {
  ShowSnackbarProps,
  SnackbarContextValue,
  SnackbarProviderProps,
} from './SnackbarProvider.types';

export const SnackbarContext = createContext<SnackbarContextValue>({
  showSnackbar: () => {},
});

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [isOpen, setOpen] = useState(false);
  const [messageInternal, setMessageInternal] = useState('');
  const [severityInternal, setSeverityInternal] = useState<SnackbarSeverity>('info');
  const [timeOutInternal, setTimeOutInternal] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const snackbarContainerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpen(false);
    if (timeOutInternal) {
      clearTimeout(timeOutInternal);
      setTimeOutInternal(undefined);
    }
  };

  const showSnackbar = ({ message, severity = 'info', duration }: ShowSnackbarProps) => {
    if (!isOpen) {
      setMessageInternal(message);
      setSeverityInternal(severity);
      let durationInternal = duration;
      if (!duration) {
        durationInternal = getDisplayDuration(message);
      }
      setOpen(true);
      setTimeOutInternal(setTimeout(handleClose, durationInternal as number));
    }
  };

  useOnClickOutside(snackbarContainerRef, handleClose);

  return (
    <>
      <SnackbarContext.Provider value={{ showSnackbar }}>{children}</SnackbarContext.Provider>
      <div ref={snackbarContainerRef}>
        <Snackbar onClose={handleClose} open={isOpen} severity={severityInternal}>
          {messageInternal}
        </Snackbar>
      </div>
    </>
  );
};

export default SnackbarProvider;
