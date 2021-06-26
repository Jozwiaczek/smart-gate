import rpio from 'rpio';

import { CAMERA_POWER, LOCK_POWER, OPEN_STATUS_LIGHT_PIN } from '../constants/pins';

const onOpen = () => {
  console.log('Opening');
  rpio.write(OPEN_STATUS_LIGHT_PIN, rpio.HIGH);
  rpio.write(CAMERA_POWER, rpio.LOW);
  rpio.write(LOCK_POWER, rpio.LOW);
  rpio.sleep(10);
  rpio.write(OPEN_STATUS_LIGHT_PIN, rpio.LOW);
  rpio.write(CAMERA_POWER, rpio.HIGH);
  rpio.write(LOCK_POWER, rpio.HIGH);
};

export default onOpen;
