import React, { ReactElement, useEffect, useState } from 'react';
import './added.goods.css';    //повтор в one.goods
import OneGoods from './one.goods';






export default function AddedGoods(): ReactElement {
const [state, setState] = useState( ()=>new Set()/*     получение состояния добавленных товаров активного таба      */);
const [active, setActive] = useState( ()=>{}  /*     получение активного товара в табе     */)

useEffect(() => {						//подписка на состояние добавленных товаров активного таба и активный товар в табе 
	

	return () => {						//отписка на состояние добавленных товаров активного таба и активный товар в табе 
		
	}
}, [])

	return (
		<div className='body-container'>
			{Array.from(state).map((item, i) => <OneGoods value={item} active={active} key={i}/>)}
		</div>
	);
}
