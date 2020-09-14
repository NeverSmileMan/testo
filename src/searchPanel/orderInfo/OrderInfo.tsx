import React, {useState} from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles((theme: Theme) => ({
	'order-info': {
		backgroundColor: theme.palette.primary.main,
		flex: '1 0 0',
		padding: '10px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	'delete-icon': {
		width: '30px',
		height: '30px',
		borderRadius: '100px',
		backgroundColor: 'white',
		color: 'red',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
	},
	'total': {
		fontWeight: 'bold',
		textAlign: 'center',
		verticalAlign: 'middle',
		paddingLeft: '20px',
		paddingRight: '20px',
		backgroundColor: 'white',
		borderRadius: '100px',
		color: theme.palette.primary.main,
		minWidth: '100px',
	}
}));

function OrderInfo(props: any) {
	const classes = useStyles();
	console.log(props)
	const calc = React.useCallback((data: string) => {
		let w: any = [];
		let x: any;
		if (props.value.length) props.value.forEach((item: any) => w.push(item[data]));
		if (props.value.length) x = w.reduce((acc: any, cur: any) => acc + cur);
		return x;
	}, [props])


	return (
		<div className={classes['order-info']}>
			{props.activeItem ?
				<div className={classes['delete-icon']} onClick={props.onClick}>
					<DeleteForeverIcon fontSize='small'/>
				</div> :
				<>
					<div className={classes.total}>
						{props.value.length ? <>{calc('amount')}</> : <>{(0)}</>}  г.
					</div>
					<div className={classes.total}>
						{props.value.length ? <>{calc('cost').toFixed(2)}</> : <>{(0).toFixed(2)}</>}
					</div>
				</>
			}
		</div>
	);
}

export default OrderInfo;
