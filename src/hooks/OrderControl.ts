import { useState, useEffect } from 'react';
import { IStateOrder } from '../data.structure/OrderControl';
import { IOrderControl } from '../data.structure/OrderControl';
import Weights from "../data.structure/Weights";
import Message from '../data.structure/Message';

const createCallbacks = (order: IOrderControl | null) => {
    const callbacksOrder = {
        delItem: order!.delItem,
        addItem: order!.addItem,
        selectItem: order!.selectItem,
        onReset: order!.onReset,
    };
    return callbacksOrder;
}

const changeStateOrder = (
    order: IOrderControl,
    setStateOrder: React.Dispatch<() => IStateOrder>,
) => {
    order.onChange(setStateOrder);
    const weights = Weights.getInstance();
    order.setWeights(weights);
    const message = Message.getInstance();
    order.onMessage(message);
    const callbacks = createCallbacks(order);
    return { ...callbacks };
};

const useOrder = (orderControl: IOrderControl) => {
    const [stateOrder, setStateOrder] = useState(orderControl.getStateObject);
    const [methods] = useState(() => changeStateOrder(orderControl, setStateOrder));
    useEffect(() => orderControl.initOrder(), [orderControl, stateOrder.order]);
    return { stateOrder, ...methods };
};

export default useOrder;
