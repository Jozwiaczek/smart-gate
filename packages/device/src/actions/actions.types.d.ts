export type ActionMode = 'OUTPUT' | 'INPUT';
export type ActionValue = 'LOW' | 'HIGH';

export type OpenAction = {
  type: 'OPEN';
  pin: number;
  mode: ActionMode;
  value: ActionValue;
};

export type WriteAction = {
  type: 'WRITE';
  pin: number;
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
};
