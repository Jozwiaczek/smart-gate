import rpio from 'rpio';

import { DOORBELL } from '../constants/pins';

const onDoorbell = () => {
  const onPoll = (): void => {
    const currentDate = new Date();
    const dateOpt = 'pl-PL';
    const time = currentDate.toLocaleTimeString(dateOpt);
    console.log('Someone ring at:', time);
  };

  rpio.poll(DOORBELL, onPoll, rpio.POLL_LOW);
};

export default onDoorbell;
