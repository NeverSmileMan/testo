import React, { useState, ReactElement } from 'react';
import GroupAlphabetButtons from './group.alphabet.buttons';
import GroupNumericButtons from './group.numeric.buttons';
import GroupSpecialButtons from './group.special.buttons';
import { Servise, IKeyboard } from './interfaces';
import { useStylesKeyboard } from './styles';

export enum Lang {
	EN = 'en',
	RU = 'ru',
	UA = 'uk',
}

export const LayoutContext = React.createContext({
	name: '' as Lang,
	setName: (val: Lang) => {},
	names: [] as Lang[],
});

function getDefaultLayout<T, K extends keyof T>(obj: T) {
	return Object.keys(obj)[0] as K;
}
interface Props {
	service: Servise;
	keyboardLayout: IKeyboard;
}

export default function Keyboard({ service, keyboardLayout }: Props): ReactElement {
	const [layoutName, setLayoutName] = useState<Lang>(getDefaultLayout(keyboardLayout.alphabet.keys));
	const classes = useStylesKeyboard();

	return (
		<div className={`${classes.keyboard} ${classes.grid}`} /* коробка для отображения расположения частей клавы*/>
			<LayoutContext.Provider
				value={{ name: layoutName, setName: setLayoutName, names: Object.keys(keyboardLayout.alphabet.keys) as Lang[] }}
			>
				{keyboardLayout.alphabet ? (
					<div className={classes.alphabet}>
						<GroupAlphabetButtons opts={keyboardLayout.alphabet} service={service} />
					</div>
				) : null}
				{keyboardLayout.numeric ? (
					<div className={classes.numeric}>
						<GroupNumericButtons options={keyboardLayout.numeric} service={service} />
					</div>
				) : null}
				{keyboardLayout.special ? (
					<div className={classes.special}>
						<GroupSpecialButtons options={keyboardLayout.special} service={service} />
					</div>
				) : null}
			</LayoutContext.Provider>
		</div>
	);
}
