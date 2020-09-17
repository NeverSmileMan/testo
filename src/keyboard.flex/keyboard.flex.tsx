import React, { useState, ReactElement } from 'react';
import { makeStyles } from '@material-ui/styles';
import GroupAlphabetButtons from './group.alphabet.buttons';
import GroupNumericButtons from './group.numeric.buttons';
import GroupSpecialButtons from './group.special.buttons';
import { Lang } from '../custom/variables';
import { Servise, IKeyboard } from './interfaces';

export const LayoutContext = React.createContext({
	name: '' as Lang,
	setName: (val: Lang) => {},
	names: [] as Lang[],
});

const useStyles = makeStyles({
	keyboard: {
		height: '100%',
		width: '100%',
		padding: '0.5em',
		display: 'flex',
		backgroundColor: '#fff',
		boxSizing: 'border-box',
		justifyContent: 'space-between',
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: '77fr 17fr 6fr',
		gridTemplateRows: '100%',
		gridGap: '0.4em',
		width: '100%',
		height: '100%',
	},
	alphabet: {
		gridColumn: '1',
		gridRow: '1',
	},
	numeric: {
		gridColumn: '2',
		gridRow: '1',
	},
	special: {
		gridColumn: '3',
		gridRow: '1',
	},
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
	const classes = useStyles();

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
