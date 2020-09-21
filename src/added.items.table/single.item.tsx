import React, { ReactElement, useCallback } from 'react';
import { useStylesSinleItem } from './styles';
import { Item } from './interfaces';

interface Props {
	item: Item;
	columns: Options;
	active: Item | null;
	changeRule: ChangeRule;
	addUnits: AddUnits;
	onClick: (val: null | Item) => void;
}
type Options = Array<Partial<keyof Item>>;

type ChangeRule = {
	[K in keyof Partial<Item>]: number | string;
};

type AddUnits = {
	[K in keyof Partial<Item>]: string;
};

export default function SingleItem({
	item,
	columns,
	changeRule = {},
	addUnits = {},
	active,
	onClick,
}: Props): ReactElement {
	const classes = useStylesSinleItem();

	const onClick_ = useCallback(() => {
		if (active === item) {
			onClick(null);
		} else {
			onClick(item);
		}
	}, [item, active, onClick]);

	return (
		<div onClick={onClick_} className={`${classes.row} ${active === item ? classes.active : ''}`}>
			{columns.map((i: keyof Item, index) => (
				<div key={index} className={`${classes.font} ${index ? classes.nthCol : classes.firstCol}`}>
					{/* значение */ changeRule[i] ? <span>{changeRule[i]}</span> : <span>{item[i]}</span>}
					{/*ед. измерения*/ addUnits[i] ? <span>{addUnits[i]}</span> : null}
				</div>
			))}
		</div>
	);
}
