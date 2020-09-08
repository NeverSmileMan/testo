import React, { ReactElement, useCallback, ReactNode } from 'react';
import { makeStyles } from '@material-ui/styles';
import { KeyValue } from './keyboard';



interface Props {
	callback: any;
	value?: KeyValue;
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
		margin:' .15em',
		boxSizing: 'border-box',
		fontWeight: 400,
		textTransform: 'uppercase',
		height: '100%',
		width: '100%',
		textAlign: 'center',
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

