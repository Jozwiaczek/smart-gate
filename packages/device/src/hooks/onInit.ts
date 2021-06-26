import rpio from 'rpio';

import { CAMERA_POWER, LOCK_POWER, OPEN_STATUS_LIGHT_PIN } from '../constants/pins';

const onInit = () => {
  console.log('Initialising -- start');
  rpio.open(OPEN_STATUS_LIGHT_PIN, rpio.OUTPUT, rpio.LOW);
  rpio.open(CAMERA_POWER, rpio.OUTPUT, rpio.LOW);
  rpio.open(LOCK_POWER, rpio.OUTPUT, rpio.LOW);
  console.log('Initialising -- complete');
};

export default onInit;
