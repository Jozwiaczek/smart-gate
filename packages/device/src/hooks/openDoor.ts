import rpio from 'rpio';

import { CAMERA_POWER, LOCK_POWER, OPEN_STATUS_LIGHT } from '../constants/pins';

const openDoor = () => {
  const dateOpt = 'pl-PL';
  const openDate = new Date();
  const openTime = openDate.toLocaleTimeString(dateOpt);
  console.log('Opening:', openTime);
  rpio.write(OPEN_STATUS_LIGHT, rpio.HIGH);
  rpio.write(CAMERA_POWER, rpio.LOW);
  rpio.write(LOCK_POWER, rpio.LOW);
  rpio.sleep(4);
  rpio.write(OPEN_STATUS_LIGHT, rpio.LOW);
  rpio.write(CAMERA_POWER, rpio.HIGH);
  rpio.write(LOCK_POWER, rpio.HIGH);
  const closedDate = new Date();
  const closedTime = closedDate.toLocaleTimeString(dateOpt);
  console.log('Closed:', closedTime);
};

export default openDoor;
