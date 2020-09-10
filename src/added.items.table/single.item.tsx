import React, { ReactElement, useCallback } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

type ItemType = 'ваговий' | 'штучний'; // заменить enum  импортом откуда-то

interface Item {
	code: string;
	name: string;
	amount: number;
	cost: number;
	type: ItemType;
}

type Options = Array<Partial<keyof Item>>;

interface Props {
	item: Item;
	columns: Options;
	active: Item | null;
	changeRule: ChangeRule; //переназвать
	addUnits: AddUnits;
}

type ChangeRule = {
	[K in keyof Partial<Item>]: number | string; //поменять?
};

type AddUnits = {
	[K in keyof Partial<Item>]: string;
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		row: {
			display: 'flex',
			flexDirection: 'row',
			minHeight: '2em',
			alignItems: 'center',
			borderBottom: `1px solid ${theme.palette.grey[700]}`,
			boxSizing: 'border-box',
			background: theme.palette.grey[100],
			'& span': {
				paddingLeft: '0.4em',
				display: 'inline-block',
			},
		},
		active: {
			background: theme.palette.grey[400],
		},
		firstCol: {
			minWidth: '6em',
			textAlign: 'start',
			flexGrow: 1,
		},
		nthCol: {
			width: '6em',
			textAlign: 'right',
			paddingRight: '2em',
		},
		font: {
			fontFamily: 'Arial',
			fontStyle: 'normal',
			fontSize: '0.7em',
			color: theme.palette.grey.A400,
			lineHeight: 'normal',
		},
	}),
);

export default function SingleItem({ item, columns, changeRule = {}, addUnits = {}, active }: Props): ReactElement {
	const classes = useStyles();

	const onClick = useCallback(() => {
		// триггер метода на удаление товара
	}, [item]);

	return (
		<div onClick={onClick} className={`${classes.row} ${active === item ? classes.row : ''}`}>
			{columns.map((i: keyof Item, index) => (
				<div key={index} className={`${classes.font} ${index ? classes.nthCol : classes.firstCol}`}>
					{/* значение */ changeRule[i] ? <span>{changeRule[i]}</span> : <span>{item[i]}</span>}
					{/*ед. измерения*/ addUnits[i] ? <span>{addUnits[i]}</span> : null}
				</div>
			))}
		</div>
	);
}
