import React, { ReactElement, useCallback, ReactNode } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Key } from './interfaces';

interface Props {
	callback: Function;
	value?: Key;
	children?: ReactNode;
	className: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		btn: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '.15rem',
			fontSize: '1.1em',
			background: theme.palette.grey[300],
			overflow: 'hidden',
			fontWeight: theme.typography.fontWeightMedium,
			textTransform: 'uppercase',
			width: '100%',
			marginLeft: '0.15em',
			marginRight: '0.15em',
		},
	}),
);

export default function Button({ callback, value, children, className }: Props): ReactElement {
	const classes = useStyles();

	const onClick = useCallback(() => {
		callback(value);
	}, [value, callback]);

	return (
		<div className={`${classes.btn} ${className}`} onClick={onClick}>
			{children ?? value}
		</div>
	);
}
