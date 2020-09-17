import { useState, useEffect } from 'react';
import { IItem } from '../data.structure/Item';
import { IStateOrder } from '../data.structure/OrderControl';
import { IOrderControl } from '../data.structure/OrderControl';

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
    order: IOrderControl | null,
    setStateOrder: React.Dispatch<() => IStateOrder>,
) => {
    order?.onChange(setStateOrder);
    const callbacks = createCallbacks(order);
    return { ...callbacks };
};

const useOrder = (order: IOrderControl | null) => {
    const [stateOrder, setStateOrder] = useState(order?.getStateObject);
    console.log(stateOrder);
    const [methods, setMethods] = useState(() => changeStateOrder(order, setStateOrder));
    useEffect(() => {
        setStateOrder(order?.getStateObject);
        setMethods(() => changeStateOrder(order, setStateOrder));
    }, [order]);

    return { stateOrder, ...methods };
};

export default useOrder;
