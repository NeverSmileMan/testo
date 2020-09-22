import React, { ReactElement } from 'react';
import { useStylesTable } from './styles';
import SingleItem from './single.item';
import { Item } from './interfaces';

interface Props {
	active: Item | null;
	onClick: React.Dispatch<React.SetStateAction<Item | null>>;
	values: Item[];
}

export default function AddedItemsTable({ values, onClick, active }: Props): ReactElement {
	const classes = useStylesTable();

	return (
		<div className={classes.bodyContainer}>
			{values.map((item: Item, i: number) => (
				<SingleItem
					item={item}
					changeRule={{
						cost: item.cost.toFixed(2),
						texts: item.plu + ' ' + item.texts.full_title,
					}}
					columns={['texts', 'amount', 'cost']}
					addUnits={{ amount: item.type === 'weighed' ? 'г.' : 'шт.' }}
					active={active}
					key={i}
					onClick={onClick}
				/>
			))}
		</div>
	);
}
