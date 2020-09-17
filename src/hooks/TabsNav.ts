import React, { useCallback, useContext } from 'react';
import { OrdersControlContext } from '../components/Orders';
import { Props } from '../components/tabs.panel/TabsNav';

const onSelect = (
    event: React.MouseEvent<HTMLDivElement>,
    selectOrder: (orderNumber: number) => void
) => {
    const target = event.target as HTMLElement;
    const tabElem: HTMLDivElement | null = target.closest('[data-order-number]');
    const orderNumber = tabElem?.dataset.orderNumber;
    orderNumber && Number.parseInt(orderNumber) && selectOrder(+orderNumber);
};

const useTabsNav = ({ selectOrder }: Props['callbacks']) => {
    return {
        ...useContext(OrdersControlContext),
        selectOrder: useCallback(
            (event) => onSelect(event, selectOrder),
            [selectOrder],
        ),
    };
};

export default useTabsNav;
