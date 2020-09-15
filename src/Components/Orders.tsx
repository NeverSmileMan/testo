import React, { createContext, useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/Orders';
import { IOrdersControl, IStateOrders } from '../data.structure/OrdersControl';
import { IStateOrder } from '../data.structure/OrderControl';
import TabsNav from './tabs.panel/TabsNav';
import Message from './tabs.panel/Message';
import HomeButton from './tabs.panel/HomeButton';
import OrderControl from './order.control/OrderControl';
import Controls from './controls/Controls';
import { IItem } from '../data.structure/Item';

export const OrderControlContext = createContext<IStateOrder>({} as IStateOrder);
export const OrdersControlContext = createContext<IStateOrders>({} as IStateOrders);

function createCallbacks(object: IOrdersControl) {
    const callbacksControls = {
        deleteOrder: () => object.deleteOrder(),
        printOrder: () => object.printOrder(),
    };
    const callbacksOrder = {
        delItem: () => object.delItem(),
        addItem: (item: IItem) => object.addItem(item),
        selectItem: (index: number | null) => object.selectItem(index),
    };
    const callbacksTabs = {
        selectOrder: (orderNumber: number) => object.selectOrder(orderNumber),
        createOrder: () => object.createOrder(),
    }
    return { callbacksTabs, callbacksOrder, callbacksControls };
}

let setStateOrder: React.Dispatch<() => IStateOrder>;
let stateOrder: IStateOrder;
function changeStateOrder(object: IOrdersControl) {
    object.onChangeOrder(() => setStateOrder(object.getStateOrder));
    return object.getStateOrder();
}

let setStateOrders: React.Dispatch<() => IStateOrders>;
let stateOrders: IStateOrders;
function changeStateOrders(object: IOrdersControl): IStateOrders {
    object.onChangeOrders(() => setStateOrders(object.getStateOrders));
    return object.getStateOrders();
}

type Props = {
    object: IOrdersControl;
} & WithStyles;

function Orders({ classes, object }: Props ) {
    const [{ callbacksTabs, callbacksOrder, callbacksControls }] = useState(() => createCallbacks(object));
    [stateOrders, setStateOrders] = useState<IStateOrders>(() => changeStateOrders(object));
    [stateOrder, setStateOrder] = useState<IStateOrder>(() => changeStateOrder(object))
    return (
        <OrdersControlContext.Provider value = {stateOrders}>
            <div className={classes.wrapper}>
                <div className='tabs-panel'>
                    <TabsNav callbacks={callbacksTabs}/>
                    <Message />
                    <HomeButton />
                </div>
                <div className='order-panel'>
                    <OrderControlContext.Provider value={stateOrder}>
                        <OrderControl callbacks={callbacksOrder}/>
                    </OrderControlContext.Provider>
                    <Controls callbacks={callbacksControls} />
                </div>
            </div>
        </OrdersControlContext.Provider>
    );
}

export default withStyles(styles)(Orders);
