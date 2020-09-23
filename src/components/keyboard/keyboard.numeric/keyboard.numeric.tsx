import React, { ReactElement } from 'react';
import Button from '../button/button';
import { Numeric, Key, Service } from '../keyboard.main/keyboard.interfaces';
import { useStylesNumeric } from './keyboard.numeric.styles';

interface Props {
	options: Numeric;
	service: Service;
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
