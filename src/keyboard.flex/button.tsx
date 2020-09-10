import React, { ReactElement, useCallback, ReactNode } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Key } from './keyboard.flex';



interface Props {
	callback: any;
	value?: Key;
	children?: ReactNode;
	className: string;
}

const useStyles = makeStyles({
	btn: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '.15rem',
		fontSize: '1.1em',
		background:'#e4e4e4', 
		overflow: 'hidden',
		fontWeight: 400,
		textTransform: 'uppercase',
		width: '100%',
		marginLeft: '0.15em',
		marginRight: '0.15em',
  },
});

export default function Button({ callback, value, children, className }: Props): ReactElement {

	const classes = useStyles();

	const onClick = useCallback(() => {
		callback(value);
	}, [value, callback]);

	return (
		<div className={`${classes.btn} + ${className}`} onClick={onClick}>
			{children ?? value}
		</div>
	);
}

