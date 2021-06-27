import rpio from 'rpio';

import { CAMERA_POWER, DOORBELL, LOCK_POWER, OPEN_STATUS_LIGHT } from '../constants/pins';
import onDoorbell from './onDoorbell';

const onInit = () => {
  console.log('Initialising -- start');
  rpio.open(OPEN_STATUS_LIGHT, rpio.OUTPUT, rpio.LOW);
  rpio.open(CAMERA_POWER, rpio.OUTPUT, rpio.HIGH);
  rpio.open(LOCK_POWER, rpio.OUTPUT, rpio.HIGH);
  rpio.open(DOORBELL, rpio.INPUT, rpio.PULL_UP);

  onDoorbell();
  console.log('Initialising -- complete');
};

export default onInit;
