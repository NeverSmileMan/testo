import React, { ReactElement, useCallback, ReactNode } from 'react';
import { Key } from '../keyboard.main/keyboard.interfaces';
import { useStylesButton } from './button.styles';
import {Actions} from '../keyboard.main/keyboard.interfaces'

interface Props {
	callback: Actions;
	value?: Key;
	children?: ReactNode;
	className: string;
}

export default function Button({ callback, value = '', children, className }: Props): ReactElement {
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
