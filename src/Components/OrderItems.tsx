import React, { useState } from 'react';
import TabControl from '../data.structure/TabControl';

const tabControl = TabControl.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const itemElem: HTMLElement | null = target.closest('[data-item-index]');
    const itemIndex = itemElem?.dataset['itemIndex'];
    itemIndex && Number.parseInt(itemIndex) >=0 && tabControl.selectItem(+itemIndex);
}

function OrderItems() {
    const [, setState] = useState({});

    useState(() => {
        tabControl.on('stateChange', () =>
            setState({}))
    });

    const selectedItemIndex = tabControl.getSelectedItemIndex();
    const items = tabControl.getItems().map((item, i) =>
        <div key={i} data-item-index={i} className={selectedItemIndex === i && 'selected' || ''}>{item.name}</div>);

    return (
        <div className='order-items' onClick={onClick}>
            {items}
        </div>
    );
}

export default OrderItems;
