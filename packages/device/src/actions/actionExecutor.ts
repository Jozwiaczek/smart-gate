import rpio from 'rpio';

import {
  Action,
  ActionMode,
  ActionValue,
  OpenAction,
  SleepAction,
  WriteAction,
} from './actions.types';

const valueMapper = (value: ActionValue): number => {
  switch (value) {
    case 'HIGH':
      return rpio.HIGH;
    case 'LOW':
      return rpio.LOW;
    default:
      throw Error(`Can't map action value.`);
  }
};

const modeMapper = (mode: ActionMode): number => {
  switch (mode) {
    case 'OUTPUT':
      return rpio.OUTPUT;
    case 'INPUT':
      return rpio.INPUT;
    default:
      throw Error(`Can't map action mode.`);
  }
};

const sleepAction = ({ time }: SleepAction) => {
  rpio.msleep(time);
};

const writeAction = ({ pin, value }: WriteAction) => {
  rpio.write(pin, valueMapper(value));
};

const openAction = ({ pin, value, mode }: OpenAction) => {
  rpio.open(pin, modeMapper(mode), valueMapper(value));
};

const execute = (actions: Array<Action>) => {
  actions.forEach((action) => {
    switch (action.type) {
      case 'OPEN':
        return openAction(action);
      case 'SLEEP':
        return sleepAction(action);
      case 'WRITE':
        return writeAction(action);
      default:
        throw Error(`Can't map action type.`);
    }
  });
};

export default execute;
