import React, { ReactElement, useCallback, ReactNode } from 'react';
import { Key } from './interfaces';
import { useStylesButton } from './styles';

interface Props {
	callback: Function;
	value?: Key;
	children?: ReactNode;
	className: string;
}

export default function Button({ callback, value, children, className }: Props): ReactElement {
	const classes = useStylesButton();

	const onClick = useCallback(() => {
		callback(value);
	}, [value, callback]);

	return (
		<div className={`${className} ${classes.btn}`} onClick={onClick}>
			{children ?? value}
		</div>
	);
}
