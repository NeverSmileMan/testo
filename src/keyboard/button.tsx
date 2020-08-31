import React, { ReactElement, useCallback, ReactNode } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Actions } from '../services/ActiveInputServise'; ////??????????
import { KeyValue } from './keyboard';

const useStyles = makeStyles({
	btn: {
		textAlign: 'center',
	},
});

interface Props {
	callback: Actions;
	value?: KeyValue;
	style?: any; //--------------???????
	children?: ReactNode;
	className: string;
}

export default function Button({ callback, style, value, children, className }: Props): ReactElement {
	const classes = useStyles(style);

	const onClick = useCallback(() => {
		callback(value);
	}, [value, callback]);

	return (
		<div className={classes.btn + ' btn ' + className} onClick={onClick}>
			{children ?? value}
		</div>
	);
}
