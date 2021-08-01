export type ActionMode = 'OUTPUT' | 'INPUT';
export type ActionValue = 'LOW' | 'HIGH';
export type ActionPin = string | number;

export type OpenAction = {
  type: 'OPEN';
  pin: ActionPin;
  mode: ActionMode;
  value: ActionValue;
};

export type WriteAction = {
  type: 'WRITE';
  pin: ActionPin;
  value: ActionValue;
};

export type SleepAction = {
  type: 'SLEEP';
  time: number;
};

export type Action = OpenAction | WriteAction | SleepAction;

export type ActionConfig = {
  onInit: Array<Action>;
  onToggle: Array<Action>;
  pinDefinition: Record<string, number>;
};
