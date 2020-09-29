import React, { FC } from 'react';
import { useStylesTable } from './items.table.styles';
import { SingleItem } from '../single.item/single.item';
import { Item } from './interfaces';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface Props {
	active: Item | null;
	onClick: React.Dispatch<React.SetStateAction<Item | null>>;
	values: Item[];
}

function getUnits(type: string, t: TFunction) : string {
	if (type === 'weighed') {
		return t('units', { context: 'gramme' });
	} else {
		return t('units', { context: 'qty' });
	}
}

export const AddedItemsTable : FC<Props> = (props) => {
	const { values, onClick, active } = props;
	const classes = useStylesTable();
	const { t } = useTranslation();
	return (
		<ul className={classes.bodyContainer}>
			{values ? values.map((item: Item, i: number) => (
				<SingleItem
					item={item}
					changeRule={{
						cost: item.cost.toFixed(2),
						texts: `${item.plu} ${item.texts.full_title}`,
					}}
					columns={['texts', 'amount', 'cost']}
					addUnits={{ amount: getUnits(item.type, t) }}
					active={active}
					key={i}
					onClick={onClick}
				/>
			)) : null}
		</ul>
	);
}
