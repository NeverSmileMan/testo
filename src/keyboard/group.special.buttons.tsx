import React, { ReactElement, useContext, useCallback } from 'react';
import Button from './button';
import { Special, LayoutContext, SpecialValue, SpecialKey, Servise } from './keyboard';
import { makeStyles } from '@material-ui/styles';

interface Props {
	options: Special;
	service: Servise;
}

const useStyles = makeStyles({
	keyboardSpecial: {
		height: '100%',
		width: '6%',
		display: 'flex',
		flexDirection: 'row-reverse',
		justifyContent: 'space-around',
		boxSizing: 'border-box',
	},
	keyboardSpecialGrid: {
		display: 'grid',
		gridGap: '0.4em',
		gridTemplateColumns: 'repeat(1, 1fr)',
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
		height: '100%',
		width: '100%',
		display: 'flex',
	}
});

export default function GroupSpecialButtons({ options, service }: Props): ReactElement {
	const layout = useContext(LayoutContext);

	const classes = useStyles();

	const changeLayout = useCallback(() => {
		layout.setName(layout.name === 'uk' ? 'en' : layout.name === 'en' ? 'ru' : 'uk'); //поменять
	}, [layout]);

	return (
		<div className={`${classes.keyboardSpecial} ${classes.keyboardSpecialGrid}`}>
			{options.keys.map((item: SpecialKey, id) =>
				item.name === 'layout' ? (
					<Button key={id} callback={changeLayout} className={classes.btnSpecial} >
						<>{item.value ? (item.value as SpecialValue)[layout.name] : null}</>
					</Button>
				) : (
					<Button key={id} callback={service[item.action as keyof Servise]} className={`${classes.btnSpecial} skey_${id}`} >
						<>{item.value}</>
					</Button>
				),
			)}
		</div>
	);
}

