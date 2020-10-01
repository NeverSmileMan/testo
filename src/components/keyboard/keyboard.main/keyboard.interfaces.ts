export type Lang = 'en' | 'ru' | 'uk';
type SpicialKey = string;

export type Layouts = {
  [K in Lang]: string;
};

export interface Service {
  add: (str: string) => void;
  delete: (str: string) => void;
  clear: () => void;
}

export type Key = string;

export type Keys = {
  [K in Lang]: string[][];
};
export interface SpecialKey {
  value: SpicialKey;
  action: keyof Service;
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
  action: keyof Service;
  options: Options | OptionsAlphabet;
}
export interface Numeric {
  keys: Key[];
  action: keyof Service;
}
export interface Special {
  keys: SpecialKey[];
  options: Options;
  layouts: Layouts;
}
export interface IKeyboard {
  alphabet: Alphabet;
  numeric: Numeric;
  special: Special;
}
