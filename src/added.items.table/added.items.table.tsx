import React, { ReactElement } from 'react';
import SingleItem from './single.item';
import './added.items.table.css';

import {Item} from '../added.goods/test';





export default function AddedItemsTable({values, onClick, active}: any): ReactElement {	//поменять onClick


	return (
		<div className="body-container">
			{values.map((item:Item, i:number) => (
				<SingleItem
					item={item}
					changeRule={{
						cost: item.cost.toFixed(2),
						name: item.code+" "+item.name, //тут добавить языки
					}}
					columns={['name', 'amount', 'cost']}
					addUnits={{ amount: item.type === 'ваговий' ? 'г.' : 'шт.' }}
					active={active}
					key={i}
				/>
			))}
		</div>
	);
}
