import { useState } from 'react';
import { IItem } from '../data.structure/Item';
import { IStateOrder } from '../data.structure/OrderControl';
import { IOrderControl } from '../data.structure/OrderControl';

const createCallbacks = (orders: IOrderControl) => {
    const callbacksOrder = {
        delItem: () => orders.delItem(),
        addItem: (item: IItem) => orders.addItem(item),
        selectItem: (index: number | null) => orders.selectItem(index),
        onReset: (callback: () => void) => orders.onReset(callback),
    };
    return callbacksOrder;
}

const changeStateOrder = (
    orders: IOrderControl,
    setStateOrder: React.Dispatch<() => IStateOrder>,
) => {
    orders.onChange(setStateOrder);
    return createCallbacks(orders);
};

const useOrder = (orders: IOrderControl) => {
    const [stateOrder, setStateOrder] = useState(orders.getStateObject);
    const [methods] = useState(() => changeStateOrder(orders, setStateOrder));
    return { ...stateOrder, stateOrder, ...methods };
};

export default useOrder;
