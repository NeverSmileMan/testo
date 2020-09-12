import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SingleItem from './single.item';

export interface Item {
	code: string;
	name: string;
	amount: number;
	cost: number;
	type: 'ваговий' | 'штучний'; //поменять?
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

export default function AddedItemsTable({ values, onClick, active }: any): ReactElement {
	//поменять onClick
	const classes = useStyles();

	return (
		<div className={classes.bodyContainer}>
			{values.map((item: Item, i: number) => (
				<SingleItem
					item={item}
					changeRule={{
						cost: item.cost.toFixed(2),
						name: item.code + ' ' + item.name, //тут добавить языки
					}}
					columns={['name', 'amount', 'cost']}
					addUnits={{ amount: item.type === 'ваговий' ? 'г.' : 'шт.' }}
					active={active}
					key={i}
					onClick={onClick}
				/>
			))}
		</div>
	);
}
