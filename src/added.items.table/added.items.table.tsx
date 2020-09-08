import React, { ReactElement } from 'react';
import { makeStyles, Theme, createStyles  } from '@material-ui/core/styles';
import SingleItem from './single.item';



export interface Item {
	code: string;
	name: string;
	amount: number;
	cost: number;
	type: 'ваговий' | 'штучний';
}

const useStyles = makeStyles((theme: Theme) => createStyles({
	bodyContainer: {
		textAlign: 'start',
		height: '83%',
		overflowY: 'auto',
		borderRadius: '0 0 0 .4em',
		padding: '0',
		margin: '0',
		display: 'flex',
		fontSize: '24px',
		flexDirection: 'column',
		flexGrow: 1,
		backgroundColor: theme.palette.primary.main,
	},
	'@global': {
    '::-webkit-scrollbar': {
      width: '40px',
    },
    '::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px #e4e4e4',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#fff',
      borderRadius: '10px',
    },
  },
}));


export default function AddedItemsTable({values, onClick, active}: any): ReactElement {	//поменять onClick

	const classes = useStyles();



	return (
		<div className={classes.bodyContainer}>
		{/* <div className={classes2.root}> */}
			{values.map((item:Item, i:number) => (
				<SingleItem
					item={item}
					changeRule={{
						cost: item.cost.toFixed(2),
						name: item.code+" "+item.name, //тут добавить языки
					}}
					columns={['name', 'amount', 'cost']}
					addUnits={{ amount: item.type === 'ваговий' ? 'г.' : 'шт.' }}
					active={active}
					key={i}
				/>
			))}
		</div>
	);
}
