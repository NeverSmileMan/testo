import React, { ReactElement, useCallback } from 'react';
import { useTheme, makeStyles, withStyles } from '@material-ui/core/styles';

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
	[K in keyof Partial<Item>]: number | string; //поменять?//поменять?//поменять?  
};
// type ChangeRule2<T> = {
// 	[K in keyof Partial<Item>]: [T]; //поменять?//поменять?//поменять?  
// };
type AddUnits = {
	[K in keyof Partial<Item>]: string;
};

const useStyles = makeStyles({
	row: {
		display: 'flex',
		flexDirection: 'row',
		minHeight: '2em',
		alignItems: 'center',
		borderBottom: '1px solid #797979',
		boxSizing: 'border-box',
		background: (props: any) => props.background,
		'& span': {
			paddingLeft: '0.4em',
			display: 'inline-block',
		},
	},
	active: {
		background: (props: any) => props.backgroundActive,
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
		color: '#333',
		lineHeight: 'normal',
	},
});

export default function SingleItem({ item, columns, changeRule = {}, addUnits = {}, active }: Props): ReactElement {
	const theme = useTheme();
	const classes = useStyles({ background: theme.palette.grey[100], backgroundActive: theme.palette.grey[400] }); {/*   ????????   */}

	const onClick = useCallback(() => {
		// триггер метода на удаление товара
	}, [item]);

	return (
		<div onClick={onClick} className={classes.row + ' ' + (active === item ? classes.row : '')}>  {/*  суммирование стилей??   */}
			{columns.map((i: keyof Item, index) => (
				<div key={index} className={classes.font + ' ' + (index ? classes.nthCol : classes.firstCol)}> {/*  суммирование стилей??   */}
					{/* значение */ changeRule[i] ? <span>{changeRule[i]}</span> : <span>{item[i]}</span>}
					{/*ед. измерения*/ addUnits[i] ? <span>{addUnits[i]}</span> : null}
				</div>
			))}
		</div>
	);
}
