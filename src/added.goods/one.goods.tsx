import React, { ReactElement, useCallback, useState, useEffect } from 'react';
import './added.goods.css';   //повтор в AddedGoods
// import {AddedGoods} from './data.structura'

// interface Props {
// 	value: AddedGoods,
// 	active: AddedGoods,
// }

export default function OneGoods(props: any) : ReactElement {     //деструкткрировать
  const [state, setState] = useState({} /*     получение активного       */);

  useEffect(() => {						//подписка на активный товар
    
    
    return () => {						//отписка на активный товар
      
    }
  }, [])

  const onClick = useCallback(() => { //триггер метода на удаление товара

  }, [props]);

	return (
		<div onClick={onClick} className={'body-item' + (props.active === props.value ? ' body-item-active' : '')}>
			<div className={'body-item-code body-item-font'}>{props.code}</div>
			<div className={'body-item-name body-item-font'}>{props.name}</div>   {/*языки??*/}
			<div className={'body-item-amount body-item-font'}>
				{props.amount}
				<span>{props.type ? 'г.' : 'шт.'}</span>
			</div>
			<div className={'body-item-cost body-item-font'}>{props.cost}</div>
		</div>
	);
}
