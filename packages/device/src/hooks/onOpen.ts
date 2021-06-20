import { OPEN_STATUS_LIGHT_PIN } from '../constants/pins';

const onOpen = () => {
  rpio.write(OPEN_STATUS_LIGHT_PIN, rpio.HIGH);
  rpio.sleep(5);
  rpio.write(OPEN_STATUS_LIGHT_PIN, rpio.LOW);
};

export default onOpen;
