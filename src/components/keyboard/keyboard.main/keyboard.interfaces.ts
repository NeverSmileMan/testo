export type Lang = 'en' | 'ru' | 'uk';
type SpicialKey = string;

export type SpecialValue = {
  [K in Lang]: string;
};

type Add = (str: string) => void;
type Delete = (str: string) => void;
type Clear = () => void;
type SetActive = (func: React.Dispatch<React.SetStateAction<string>>) => void;
type UnsetActive = (func: React.Dispatch<React.SetStateAction<string>>) => void;

export type Actions = Add | Delete | Clear;

export type KeyboardService = Pick<Service, 'add' | 'clear' | 'delete'>;

export interface Service {
  add: Add;
  delete: Delete;
  clear: Clear;
  setActive: SetActive;
  unsetActive: UnsetActive;
}

export type Key = string;

export type Keys = {
  [K in Lang]: Key[][];
};
export interface SpecialKey {
  value: SpicialKey;
  action: keyof KeyboardService;
  id: number;
  icon?: JSX.Element;
}

interface Options {
  row: number;
  col: number;
}
export type OptionsAlphabet = {
  [K in Lang]: Options;
};
export interface Alphabet {
  keys: Keys;
  action: keyof KeyboardService;
  options: Options | OptionsAlphabet;
}
export interface Numeric {
  keys: Key[];
  action: keyof KeyboardService;
  options: Options;
}
export interface Special {
  keys: SpecialKey[];
  options: Options;
  layouts: SpecialValue;
}
export interface IKeyboard {
  alphabet: Alphabet;
  numeric: Numeric;
  special: Special;
}
