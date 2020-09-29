import React, { FC } from 'react';
import { Button } from '../button/button';
import { Numeric, Key } from '../keyboard.main/keyboard.interfaces';

interface Props<T> {
	options: Numeric;
	onClick: (value: T) => void;
	classes: Record<any, string>;
}

type BtnClass =
	| 'nkey_0'
	| 'nkey_1'
	| 'nkey_2'
	| 'nkey_3'
	| 'nkey_4'
	| 'nkey_5'
	| 'nkey_6'
	| 'nkey_7'
	| 'nkey_8'
	| 'nkey_9';

export const KeyboardNumeric: FC<Props<string>> = (props) => {
  const { options, onClick, classes } = props;
  
	return (
		<div className={classes.keyboardNumeric}>
			{options.keys.map((item: Key, id: number) => (
				<Button
					key={item}
					value={item}
					callback={onClick}
					className={`${classes[`nkey_${id}` as BtnClass]} ${classes.btn}`}
				/>
			))}
		</div>
	);
};
