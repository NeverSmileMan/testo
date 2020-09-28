import React, { ReactElement, useCallback } from 'react';
import { useStylesSingleItem } from './single.item.styles';
import { Item } from '../items.table/interfaces';

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
	const classes = useStylesSingleItem();

	const selectItem = useCallback(() => {
		if (active === item) {
			onClick(null);
		} else {
			onClick(item);
		}
	}, [item, active, onClick]);

	return (
		<li className={`${classes.row} ${active === item ? classes.active : ''}`}>
			<div onClick={selectItem} aria-hidden="true" className={classes.wrap}>
				{columns.map((i: keyof Item, index) => (
					<div key={i} className={`${classes.font} ${index ? classes.nthCol : classes.firstCol}`}>
						{changeRule[i] ? <span>{changeRule[i]}</span> : <span>{item[i]}</span>}
						{addUnits[i] ? <span>{addUnits[i]}</span> : null}
					</div>
				))}
			</div>
		</li>
	);
}
