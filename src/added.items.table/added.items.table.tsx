import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SingleItem from './single.item';

enum ItemTypes {
	weights = 'weighed',
	piece = 'pieced',
}
interface Defaults {
	tara: number;
	pieces_per_package: number;
}
interface Lifetime {
	shelf_life_1: number;
}
interface Texts {
	article: string;
	full_title: string;
	shop: string;
	short_title: string;
}
export interface Item {
	defaults: Defaults;
	id: string;
	lifetime: Lifetime;
	plu: number;
	price: number;
	searchIndex: string;
	texts: Texts;
	type: ItemTypes;
	cost: number;
	amount: number;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		bodyContainer: {
			textAlign: 'start',
			height: '83%',
			overflowY: 'auto',
			padding: '0px',
			margin: '0px',
			display: 'flex',
			fontSize: '24px',
			flexDirection: 'column',
			flexGrow: 1,
			backgroundColor: theme.palette.grey[500],
		},
	}),
);

interface Props {
	active: Item | null;
	onClick: React.Dispatch<React.SetStateAction<Item | null>>;
	values: Item[];
}

export default function AddedItemsTable({ values, onClick, active }: Props): ReactElement {
	const classes = useStyles();

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
					addUnits={{ amount: item.type === ItemTypes.weights ? 'г.' : 'шт.' }}
					active={active}
					key={i}
					onClick={onClick}
				/>
			))}
		</div>
	);
}
