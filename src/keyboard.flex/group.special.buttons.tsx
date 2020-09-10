import React, { ReactElement, useContext, useCallback } from 'react';
import Button from './button';
import { Special, LayoutContext, SpecialValue, SpecialKey, Servise } from './keyboard.flex';
import { makeStyles } from '@material-ui/styles';

interface Props {
	options: Special;
	service: Servise;
}

const useStyles = makeStyles({
	keyboardSpecial: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		boxSizing: 'border-box',
	},
	keyboardSpecialGrid: {
		display: 'grid',
		gridGap: '0.4em',
		gridTemplateColumns: 'repeat(1, 1fr)',
		gridTemplateRows: 'repeat(3, 1fr)',
	},
	skey_0: {
		gridColumn: '1',
		gridRow: '1',
	},
	skey_1: {
		gridColumn: '1',
		gridRow: '2',
	},
	skey_2: {
		gridColumn: '1',
		gridRow: '3',
	},
	btnSpecial: {
		display: 'flex',
		margin: '0px',
	},
	clearBtn: {
		fontSize: '0.8em',
	},
});

export default function GroupSpecialButtons({ options, service }: Props): ReactElement {
	const layout = useContext(LayoutContext);
	const classes = useStyles();

	const changeLayout = useCallback(() => {
		let index = layout.names.indexOf(layout.name);

		if (index + 1 === layout.names.length) {
			layout.setName(layout.names[0]);
		} else {
			layout.setName(layout.names[index + 1]);
		}
	}, [layout]);

	return (
		<div className={`${classes.keyboardSpecial} ${classes.keyboardSpecialGrid}`}>
			{options.keys.map((item: SpecialKey, id) =>
				item.name === 'layout' ? (
					<Button key={id} callback={changeLayout} className={classes.btnSpecial}>
						<>{item.value ? (item.value as SpecialValue)[layout.name] : null}</>
					</Button>
				) : (
					<Button
						key={id}
						callback={service[item.action as keyof Servise]}
						className={`${classes.btnSpecial} skey_${id} ${item.value === 'CLEAR' ? classes.clearBtn : ''}`}
					>
						<>{item.value}</>
					</Button>
				),
			)}
		</div>
	);
}
