import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SingleItem from './single.item';
import { ItemTypes } from '../custom/variables';

export interface Item {
	code: string;
	name: string;
	amount: number;
	cost: number;
	price: number;
	type: ItemTypes; 
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
						name: item.code + ' ' + item.name, //!тут добавить языки?
					}}
					columns={['name', 'amount', 'cost']}
					addUnits={{ amount: item.type === ItemTypes.weights ? 'г.' : 'шт.' }}
					active={active}
					key={i}
					onClick={onClick}
				/>
			))}
		</div>
	);
}
