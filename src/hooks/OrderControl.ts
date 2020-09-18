import { useState, useEffect } from 'react';
import { IItem } from '../data.structure/Item';
import { IStateOrder } from '../data.structure/OrderControl';
import { IOrderControl } from '../data.structure/OrderControl';
import Weights from "../data.structure/Weights";
import Message from '../data.structure/Message';
// import messagesInfo from '../data.structure/data/messagesInfo';

const createCallbacks = (order: IOrderControl | null) => {
    const callbacksOrder = {
        delItem: () => order?.delItem(),
        addItem: (item: IItem) => order?.addItem(item),
        selectItem: (index: number | null) => order?.selectItem(index),
        onReset: (callback: () => void) => order?.onReset(callback),
    };
    return callbacksOrder;
}

const changeStateOrder = (
    order: IOrderControl,
    setStateOrder: React.Dispatch<() => IStateOrder>,
) => {
    order.onChange(setStateOrder);
    const weights = Weights.getInstance();
    weights.onChange(order.onWeightsChange);
    const message = Message.getInstance();
    order.onMessage(message.sendMessage);
    const callbacks = createCallbacks(order);
    return { ...callbacks };
};

const useOrder = (order: IOrderControl) => {
    const [stateOrder, setStateOrder] = useState(order?.getStateObject);
    const [methods] = useState(() => changeStateOrder(order, setStateOrder));
    useEffect(() => order.initOrder(), [order]);
    return { stateOrder, ...methods };
};

export default useOrder;

    // useEffect(() => {
    //     const weights = Weights.getInstance();
    //     const onWeightsChange = order?.onWeightsChange;
    //     if (onWeightsChange) weights.onChange(onWeightsChange);
    //     setStateOrder(order?.getStateObject);
    //     setMethods(() => changeStateOrder(order, setStateOrder));
    //     return () => {
    //         if (onWeightsChange) {
    //             weights.off(onWeightsChange);
    //         }         
    //     };
    // }, [order]);