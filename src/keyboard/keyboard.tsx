import React, { useState, ReactElement } from 'react';
import { makeStyles } from '@material-ui/styles';
import GroupAlphabetButtons from './group.alphabet.buttons';
import GroupNumericButtons from './group.numeric.buttons';
import GroupSpecialButtons from './group.special.buttons';


//---------------------
type Lang = 'en' | 'ru' | 'uk'; // должно импортироваться???
//------------------



type SpicialKey = string | undefined |  JSX.Element | SpecialValue;

export type SpecialValue = {
		[K in Lang]: string;
	}
	
export interface Servise {
	add: (str: string)=>void;
	delete: (number: number)=>void;
	clear: ()=>void;
	setActive: (func: React.SetStateAction<string>)=>void;
	unsetActive: (func: React.SetStateAction<string>)=>void;
}
				
interface KeyOpts {
	hMultiplier: number;
	wMultiplier: number;
}
export type KeyValue = string;
export interface KeyWithOpts {
	key: KeyValue;
	opts: KeyOpts;
};

export type Key = KeyWithOpts | KeyValue;

export type Keys = {
	[K in Lang]: Key[];
};
export interface SpecialKey {
	name?: string;
	value: SpicialKey;
	action: keyof Servise | 'none';
}

export interface Alphabet {
	keys: Keys;
	action: keyof Servise;
	options: any;
}
export interface Numeric {
	keys: Key[];
	action: keyof Servise;
	options: any;
}
export interface Special {
	keys: SpecialKey[];
	options: any;
}
export interface Keyboard {
	alphabet?: Alphabet;
	numeric?: Numeric;
	special?: Special;
}


interface Props {
	service: Servise;
	keyboardLayout: Keyboard;
}


export const LayoutContext = React.createContext({
	name: '' as Lang,
	setName: (val: Lang)=>{}

});

const useStyles = makeStyles({
	keyboard: {
		height: '100%',
		width: '100%',
		padding: '0.4em',
		display: 'flex',
		backgroundColor: '#fff',
		boxSizing: 'border-box',
		justifyContent: 'space-between',
  },
});

export default function Keyboard({ service, keyboardLayout }: Props): ReactElement {
	const [layoutName, setLayoutName] = useState<Lang>('uk'); // вынести как язык по умолчанию

	const classes = useStyles();

	return (
		<div className={classes.keyboard} /* коробка для отображения расположения частей клавы*/>
			<LayoutContext.Provider value={ {name: layoutName, setName: setLayoutName} }>
				{keyboardLayout.alphabet ? <GroupAlphabetButtons options={keyboardLayout.alphabet} service={service} /> : null}
				{keyboardLayout.numeric ? <GroupNumericButtons options={keyboardLayout.numeric} service={service} /> : null}
				{keyboardLayout.special ? <GroupSpecialButtons options={keyboardLayout.special} service={service}/> : null}
			</LayoutContext.Provider>
		</div>
	);
}

