import { Lang } from './keyboard.flex';

type SpicialKey = string | undefined | JSX.Element | SpecialValue;

export type SpecialValue = {
	[K in Lang]: string;
};

type Add = (str: string) => void;
type Delete = (number: number) => void;
type Clear = () => void;
type SetActive = (func: React.Dispatch<React.SetStateAction<string>>) => void;
type UnsetActive = (func: React.Dispatch<React.SetStateAction<string>>) => void;

export type Actions = Add | Delete | Clear | SetActive | UnsetActive;

export interface Servise {
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
	name?: string;
	value: SpicialKey;
	action: keyof Servise | 'none';
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
	action: keyof Servise;
	options: Options | OptionsAlphabet;
}
export interface Numeric {
	keys: Key[];
	action: keyof Servise;
	options: Options;
}
export interface Special {
	keys: SpecialKey[];
	options: Options;
}
export interface IKeyboard {
	alphabet: Alphabet;
	numeric: Numeric;
	special?: Special;
}
