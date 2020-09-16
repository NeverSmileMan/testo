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
    object: IOrderControl,
    setStateOrder: React.Dispatch<() => IStateOrder>,
) => {
    object.onChangeOrder(setStateOrder);
};

const useOrder = (orders: IOrderControl) => {
    const [{
        addItem, delItem,
        selectItem, onReset }] = useState(() => createCallbacks(orders));
    const [stateOrder, setStateOrder] = useState(orders.getStateOrder);
    useState(() => changeStateOrder(orders, setStateOrder));
    const { order, orderMode } = stateOrder;
    return { order, orderMode, stateOrder, addItem, delItem, selectItem, onReset};
};

export default useOrder;
