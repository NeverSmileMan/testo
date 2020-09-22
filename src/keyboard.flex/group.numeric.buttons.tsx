import React, { ReactElement } from 'react';
import Button from './button';
import { Numeric, Key, Servise } from './interfaces';
import { useStylesNumeric } from './styles';

interface Props {
	options: Numeric;
	service: Servise;
}

export default function GroupNumericButtons({ options, service }: Props): ReactElement {
	const classes = useStylesNumeric();

	return (
		<div className={classes.keyboardNumeric}>
			{options.keys.map((item: Key, id: number) => (
				<Button
					key={id}
					value={item}
					callback={service[options.action]}
					className={`${(classes as any)[`nkey_${id}`]} ${classes.btnNumeric}`}
				/>
			))}
		</div>
	);
}
