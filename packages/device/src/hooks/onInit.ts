import { OPEN_STATUS_LIGHT_PIN } from '../constants/pins';

const onInit = () => {
  rpio.open(OPEN_STATUS_LIGHT_PIN, rpio.OUTPUT, rpio.LOW);
};

export default onInit;
