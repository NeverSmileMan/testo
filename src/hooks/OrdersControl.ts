import { useState } from 'react';

import OrdersControl, { IOrdersControl, IStateOrders } from '../data.structure/OrdersControl';

const createCallbacks = (orders: IOrdersControl) => {
    const callbacksControls = {
        deleteOrder: () => orders.deleteOrder(),
        printOrder: () => orders.printOrder(),
    };
    const callbacksTabs = {
        selectOrder: (orderNumber: number) => orders.selectOrder(orderNumber),
        createOrder: () => orders.createOrder(),
    }
    return { callbacksTabs, callbacksControls };
}

const changeStateOrders = (
    orders: IOrdersControl,
    setStateOrders: React.Dispatch<() => IStateOrders>,
) => {
    orders.onChangeOrders(setStateOrders);
};

const useOrders = (maxOrdersCount: number) => {
    const [orders] = useState(() => new OrdersControl(maxOrdersCount) as IOrdersControl);
    const [stateOrders, setStateOrders] = useState(orders.getStateOrders);
    useState(() => changeStateOrders(orders, setStateOrders));
    const [callbacks] = useState(() => createCallbacks(orders));
    return { orders, stateOrders, ...callbacks };
};

export default useOrders;