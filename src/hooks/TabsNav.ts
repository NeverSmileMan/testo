import React, { useCallback, useContext } from 'react';
import { OrdersControlContext } from '../components/Orders';
import { Props } from '../components/tabs.panel/TabsNav';
import { IStateOrders }  from '../data.structure/OrdersControl';

const onSelect = (event: React.MouseEvent<HTMLDivElement>, selectOrder: (orderNumber: number) => void) => {
    const target = event.target as HTMLElement;
    const tabElem: HTMLDivElement | null = target.closest('[data-order-number]');
    const orderNumber = tabElem?.dataset.orderNumber;
    orderNumber && Number.parseInt(orderNumber) && selectOrder(+orderNumber);
}

const useTabsNav = (callbacks: Props['callbacks']) => {
    const selectOrder = useCallback(
        (event) => onSelect(event, callbacks.selectOrder),
        [callbacks],
    );
    const context: IStateOrders = useContext(OrdersControlContext);
    return { ...context, selectOrder };
};

export default useTabsNav;
