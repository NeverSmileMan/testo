import React, { ReactElement, useContext, useCallback } from 'react';
import Button from '../button/button';
import { Special, SpecialValue, SpecialKey, Service } from '../keyboard.main/keyboard.interfaces';
import { LayoutContext } from '../keyboard.main/keyboard.main';
import { useStylesSpecial } from './keyboard.special.styles';

interface Props {
	options: Special;
	service: Service;
}

export default function GroupSpecialButtons({ options, service }: Props): ReactElement {
	const layout = useContext(LayoutContext);
	const classes = useStylesSpecial();

	const changeLayout = useCallback(() => {
		let index = layout.names.indexOf(layout.name);

		if (index + 1 === layout.names.length) {
			layout.setName(layout.names[0]);
		} else {
			layout.setName(layout.names[index + 1]);
		}
	}, [layout]);

	return (
		<div className={`${classes.keyboardSpecial} ${classes.keyboardSpecialGrid}`}>
			{options.keys.map((item: SpecialKey, id) =>
				item.name === 'layout' ? (
					<Button key={id} callback={changeLayout} className={classes.btnSpecial}>
						<>{item.value ? (item.value as SpecialValue)[layout.name] : null}</>
					</Button>
				) : (
					<Button
						key={id}
						callback={service[item.action as keyof Service]}
						className={`${classes.btnSpecial} skey_${id} ${item.value === 'CLEAR' ? classes.clearBtn : ''}`}
					>
						<>{item.value}</>
					</Button>
				),
			)}
		</div>
	);
}
