import { Lang } from './keyboard.main';

type SpicialKey = string | undefined | JSX.Element | SpecialValue;

export type SpecialValue = {
	[K in Lang]: string;
};

type Add = (str: string) => void;
type Delete = (str: string) => void;
type Clear = () => void;
type SetActive = (func: React.Dispatch<React.SetStateAction<string>>) => void;
type UnsetActive = (func: React.Dispatch<React.SetStateAction<string>>) => void;

export type Actions = Add | Delete | Clear;

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
	name?: string;
	value: SpicialKey;
	action: keyof Service | 'none';
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
