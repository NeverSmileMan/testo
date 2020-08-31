import React, { ReactElement, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';

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
	firstColsWidthPercent?: number;
	active: Item | null;
	changeRule: ChangeRule; //переназвать
	addUnits: AddUnits;
}
type ChangeRule = {
	[K in keyof Partial<Item>]: number | string; //поменять?//поменять?//поменять?  надо дженерик для намбера или стринги
};
// type ChangeRule2<T> = {
// 	[K in keyof Partial<Item>]: [T]; //поменять?//поменять?//поменять?  надо дженерик для намбера или стринги
// };
type AddUnits = {
	[K in keyof Partial<Item>]: string; //поменять?//поменять?//поменять?
};

//-------------------------------------------

const useStyles = makeStyles({
	firstCol: {
		width: (props: any) => props.firstColWidth,
		textAlign: 'start',
	},
	nthCol: {
		width: (props: any) => props.nthColWidth,
		textAlign: 'right',
		paddingRight: '2em',
	},
});

//-------------------------------------------

export default function SingleItem({
	item,
	columns,
	firstColsWidthPercent = 70, // создать default props и вынести
	changeRule = {},
	addUnits = {},
	active,
}: Props): ReactElement {
	const classes = useStyles({
		firstColWidth: `${firstColsWidthPercent}%`,
		nthColWidth: `${(100 - firstColsWidthPercent) / (columns.length - 1)}%`,
	});

	const onClick = useCallback(() => {
		// триггер метода на удаление товара
	}, [item]);

	return (
		<div onClick={onClick} className={'body-item' + (active === item ? ' body-item-active' : '')}>
			{columns.map((i: keyof Item, index) => (
				<div key={index} className={'body-item-font ' + (index ? classes.nthCol : classes.firstCol)}>
					{/* значение */changeRule[i] ? <span>{changeRule[i]}</span> : <span>{item[i]}</span>}
					{/*ед. измерения*/addUnits[i] ? <span>{addUnits[i]}</span> : null}
				</div>
			))}
		</div>
	);
}
