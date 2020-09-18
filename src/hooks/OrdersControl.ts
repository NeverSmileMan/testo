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
    orders.onChange(setStateOrders);
    return createCallbacks(orders);
};

const useOrders = (maxOrdersCount: number) => {
    const [orders] = useState(() => new OrdersControl(maxOrdersCount));
    const [stateOrders, setStateOrders] = useState(orders.getStateObject);
    const [methods] = useState(() => changeStateOrders(orders, setStateOrders));
    return { stateOrders, ...methods, orderControl: orders.getOrderControl() };
};

export default useOrders;
