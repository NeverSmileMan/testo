import React, { useState, ReactElement } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GroupAlphabetButtons from './group.alphabet.buttons';
import GroupNumericButtons from './group.numeric.buttons';
import GroupSpecialButtons from './group.special.buttons';

//-------
import { ActiveInputServise } from '../services/ActiveInputServise';
//-------
import './keyboard.css';

type Lang = 'en' | 'ru' | 'uk'; // должно импортироваться

type AlphabetKey = string;
type NumericKey = number;
type SpicialKey = string | number | undefined |  JSX.Element | SpecialValue;
export type KeyValue = AlphabetKey | NumericKey | SpicialKey; 

export type Alphabet = {
	[K in Lang]: AlphabetKey[];
};
export type SpecialValue = {
	[K in Lang]: string;
}

export interface Special {
	name?: string;
	value: SpicialKey;
	action: keyof ActiveInputServise | 'none';
}
interface Keyboard {
	alphabet?: Alphabet;
	numeric?: NumericKey[];
	special?: Special[];
}

const arr_EN = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '];
const arr_RU = ['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ь','ы','ъ','э','ю','я',' '];
const arr_UK = ['а','б','в','г','ґ','д','е','є','ж','з','и','і','ї','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ь','ю','я',' '];
const arr_num = [0,1,2,3,4,5,6,7,8,9];
// const arr_symb = ['!', '@', '#', '$', '%', '&', '?', '-', '+', '=', '~'];

export const keyBoard: Keyboard = {
	alphabet: {
		en: arr_EN,
		ru: arr_RU,
		uk: arr_UK,
	},
	numeric: arr_num,
	special: [
		{
			name: 'icon',
			action: 'delete',
			value: <ArrowBackIcon />,
		},
		{
			value: 'CLEAR',
			action: 'clear',
		},
		{
			name: 'layout',
			action: 'none',
			value: {
				en: 'EN',
				ru: 'RU',
				uk: 'UA',
			},
		},
	],
};

type Layouts = keyof Alphabet;


interface Props {
	service: ActiveInputServise;
	keyboardLayout: Keyboard;
	options: any; //-------------
}




export const LayoutContext = React.createContext({
	name: '' as Lang,
	setName: (val: Lang)=>{}

});









export default function Keyboard({ service, keyboardLayout, options }: Props): ReactElement {
	const [layoutName, setLayoutName] = useState<Layouts>('uk'); // вынести как язык по умолчанию


	return (
		<div className='keyboard' /* коробка для отображения расположения частей клавы*/>
			<LayoutContext.Provider value={ {name: layoutName, setName: setLayoutName} }>
				{keyboardLayout.alphabet ? <GroupAlphabetButtons value={keyboardLayout.alphabet[layoutName]} onClick={service.add} /> : null}
				{keyboardLayout.numeric ? <GroupNumericButtons value={keyboardLayout.numeric} onClick={service.add} /> : null}
				{keyboardLayout.special ? <GroupSpecialButtons value={keyboardLayout.special} service={service}/> : null}
			</LayoutContext.Provider>
		</div>
	);
}


//исправить layout callback - наверное вынести в отдельную кнопку и пропсом скинуть создание?
//space?
//options
//
