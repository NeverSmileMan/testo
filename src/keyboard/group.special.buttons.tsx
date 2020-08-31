import React, { ReactElement, useContext, useCallback } from 'react';
import Button from './button';
import { Special, LayoutContext, SpecialValue } from './keyboard';

interface Props {
	value: Special[];
	service: any; ////???;
}

export default function GroupSpecialButtons({ value, service }: Props): ReactElement {
	const layout = useContext(LayoutContext);

	const changeLayout = useCallback(() => {
		layout.setName(layout.name === 'uk' ? 'en' : layout.name === 'en' ? 'ru' : 'uk'); //поменять
	}, [layout]);

	return (
		<div className="keyboard-special keyboard-special-grid">
			{value.map((item: Special, id) =>
				item.name === 'layout' ? (
					<Button key={id} callback={changeLayout} className={'btn-special'} >
						<>{item.value ? (item.value as SpecialValue)[layout.name] : null}</>
					</Button>
				) : (
					<Button key={id} callback={service[item.action]} className={`btn-special skey-${id}`} >
						<>{item.value}</>
					</Button>
				),
			)}
		</div>
	);
}
