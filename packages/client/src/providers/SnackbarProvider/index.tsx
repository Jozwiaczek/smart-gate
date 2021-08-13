import React, { FC, useRef, useState } from 'react';

import { Snackbar } from '../../elements';
import { SnackbarLeftAdornment } from '../../elements/Snackbar/Snackbar.styled';
import { SnackbarSeverity } from '../../elements/Snackbar/Snackbar.types';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import getDisplayDuration from './getDisplayDuration';
import { SnackbarContext } from './SnackbarProvider.context';
import { ShowSnackbarProps, SnackbarProviderProps } from './SnackbarProvider.types';

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [isOpen, setOpen] = useState(false);
  const [messageInternal, setMessageInternal] = useState('');
  const [severityInternal, setSeverityInternal] = useState<SnackbarSeverity>('info');
  const [LeftAdornmentInternal, setLeftAdornmentInternal] = useState<FC>();
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

  const showSnackbar = ({
    message,
    severity = 'info',
    duration,
    leftAdornment,
  }: ShowSnackbarProps) => {
    if (!isOpen) {
      setMessageInternal(message);
      setSeverityInternal(severity);
      setLeftAdornmentInternal(leftAdornment);
      let durationInternal = duration;
      if (!duration) {
        durationInternal = getDisplayDuration(message) + (leftAdornment ? 1000 : 0);
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
          {LeftAdornmentInternal && (
            <SnackbarLeftAdornment>
              <LeftAdornmentInternal />
            </SnackbarLeftAdornment>
          )}
          {messageInternal}
        </Snackbar>
      </div>
    </>
  );
};

export default SnackbarProvider;
