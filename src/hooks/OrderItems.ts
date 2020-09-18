import React, { useCallback, useContext  } from 'react';
import { OrderControlContext } from '../components/order.control/OrderControl';
import { IStateOrder } from '../data.structure/OrderControl';

export const selectItem = (event: React.MouseEvent<HTMLDivElement>, selectItem: (index: number) => void) => {
    const target = event.target as HTMLElement;
    const itemElem: HTMLElement | null = target.closest('[data-item-index]');
    const itemIndex = itemElem?.dataset['itemIndex'];
    itemIndex && Number.parseInt(itemIndex) >=0 && selectItem(+itemIndex);
}

function useOrderItems(onSelect: (index: number | null) => void) {
    const context: IStateOrder = useContext(OrderControlContext);
    const onClick = useCallback((event) => selectItem(event, onSelect), [onSelect]);
    
    return { ...context, onClick };
}

export default useOrderItems;
