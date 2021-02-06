import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import MuiAlert, { Color } from '@material-ui/lab/Alert';
import React, { createContext, FC, useState } from 'react';

export interface SnackbarContextValue {
  showSnackbar: (props: ShowSnackbarProps) => void;
}

export const SnackbarContext = createContext<SnackbarContextValue>({
  showSnackbar: () => {},
});

const getDisplayDuration = (message: string): number => {
  const { min, max } = Math;
  const msgLength = message.length;

  return min(max(msgLength * 50, 2000), 7000);
};

export interface ShowSnackbarProps {
  message: string;
  severity?: Color;
  position?: SnackbarOrigin;
  duration?: number;
}

const initPosition: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'center',
};

const SnackbarProvider: FC = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [messageInternal, setMessageInternal] = useState('');
  const [severityInternal, setSeverityInternal] = useState<Color>('info');
  const [durationInternal, setDurationInternal] = useState(getDisplayDuration(messageInternal));
  const [positionInternal, setPositionInternal] = useState<SnackbarOrigin>(initPosition);

  const showSnackbar = ({
    message,
    severity = 'info',
    position = initPosition,
    duration,
  }: ShowSnackbarProps) => {
    setMessageInternal(message);
    setSeverityInternal(severity);
    setPositionInternal(position);
    if (duration) {
      setDurationInternal(duration);
    } else {
      setDurationInternal(getDisplayDuration(message));
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SnackbarContext.Provider value={{ showSnackbar }}>{children}</SnackbarContext.Provider>
      <Snackbar
        anchorOrigin={positionInternal}
        open={isOpen}
        autoHideDuration={durationInternal}
        onClose={handleClose}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severityInternal}>
          {messageInternal}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default SnackbarProvider;
