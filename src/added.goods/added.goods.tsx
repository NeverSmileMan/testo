import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/styles';
import './added.goods.css';

interface Props {
	values: any[];
	onClick: (e: any) => void;
	options?: any;
	active: number;
}
const defaultStyleRow = {
	// backgroundColor: 'gray',
	// color: 'black',
	display: 'flex',
	// width: '100%',
};
const defaultStyleCol = {
	backgroundColor: 'inherit',
	color: 'inherit',
	// display: 'inline',
	margin: 'none',
	flexDirection: 'row',
};
const useStyles = makeStyles({
	row: {
		// color: (props: any) => (props.color ? props.color : defaultStyleRow.color),
		// backgroundColor: (props: any) => (props.backgroundColor ? props.backgroundColor : defaultStyleRow.backgroundColor),
		// width: (props: any) => (props.width ? props.width : defaultStyleRow.width),
		display: (props: any) => (props.display ? props.display : defaultStyleRow.display),
	},
	col: {
		color: (props: any) => (props.color ? props.color : defaultStyleCol.color),
		backgroundColor: (props: any) => (props.backgroundColor ? props.backgroundColor : defaultStyleCol.backgroundColor),
		// display: (props: any) => (props.display ? props.display : defaultStyleCol.display),
		margin: (props: any) => (props.margin ? props.margin : defaultStyleCol.margin),
		flexDirection: (props: any) => (props.flexDirection ? props.flexDirection : defaultStyleCol.flexDirection),
	},
	total: {
		width: '100%',
	},
});


export default function AddedGoods({ values, onClick, options, active }: Props): ReactElement {
	const classes = useStyles(options);

	return (
		<div className={classes.total + ' body-container'}>
			{values.map((item, i) => {
				return (
					<div
						id={`${i}`}
						onClick={onClick}
						className={classes.row + ' body-item' + (active===i ? ' body-item-active' : '')}
						key={i}
					>
						<div className={classes.col + ' body-item-code body-item-font'}>{item.code}</div>
						<div className={classes.col + ' body-item-name body-item-font'}>{item.name}</div>
						<div className={classes.col + ' body-item-amount body-item-font'}>
							{item.amount}
							<span>{item.isWeight ? 'г.' : 'шт.'}</span>
						</div>
						<div className={classes.col + ' body-item-cost body-item-font'}>{item.cost}</div>
					</div>
				);
			})}
		</div>
	);
}
