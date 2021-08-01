import rpio from 'rpio';

import actionsConfig from '../config/actions.config.json';
import {
  Action,
  ActionConfig,
  ActionMode,
  ActionPin,
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

const pinMapper = (pin: ActionPin): number => {
  let definedPin = pin;

  if (typeof pin === 'string') {
    definedPin = (actionsConfig as ActionConfig).pinDefinition[pin];
  }

  if (typeof definedPin === 'number') {
    return definedPin;
  }
  throw Error(`Invalid pin value: ${pin}`);
};

const sleepAction = ({ time }: SleepAction) => {
  rpio.msleep(time);
};

const writeAction = ({ pin, value }: WriteAction) => {
  rpio.write(pinMapper(pin), valueMapper(value));
};

const openAction = ({ pin, value, mode }: OpenAction) => {
  rpio.open(pinMapper(pin), modeMapper(mode), valueMapper(value));
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
