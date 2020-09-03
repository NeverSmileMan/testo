import React, { useState } from 'react';
import InputObject from '../data.structure/Input';

const list = InputObject.getInputListInstance().getListInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const itemElem: HTMLElement | null = target.closest('[data-item-index]');
    const itemIndex = itemElem?.dataset['itemIndex'];
    itemIndex && list.selectItem(+itemIndex);
}

function List() {
    const [, setState] = useState({});

    useState(() => {
        list.onUpdate(() => {
            setState({});
        });
    });

    const itemsArray = list.getItems();

    if (!itemsArray) return null;
    
    const items = itemsArray.map((item, i) => <div key={i} data-item-index={i}>{item.name}</div>);

    return (
        <div className='list' onClick={onClick}>
            {items.length ? items : 'НІЧОГО НЕ ЗНАЙДЕНО'}
        </div>
    );
}

export default List;
