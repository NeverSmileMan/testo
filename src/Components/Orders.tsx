import React, { createContext, useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/Orders';
import OrdersControl, { IOrdersControl, IStateOrders } from '../data.structure/OrdersControl';
import TabsNav from './tabs.panel/TabsNav';
import Message from './tabs.panel/Message';
import HomeButton from './tabs.panel/HomeButton';
import OrderControl from './order.control/OrderControl';
import Controls from './controls/Controls';

export const OrdersControlContext = createContext<IStateOrders>({} as IStateOrders);

function createCallbacks(orders: IOrdersControl) {
    const callbacksMessage = {
        onMessage: orders.onMessage,
    };
    const callbacksControls = {
        deleteOrder: () => orders.deleteOrder(),
        printOrder: () => orders.printOrder(),
    };
    const callbacksTabs = {
        selectOrder: (orderNumber: number) => orders.selectOrder(orderNumber),
        createOrder: () => orders.createOrder(),
    }
    return { callbacksMessage, callbacksTabs, callbacksControls };
}

function changeStateOrders(orders: IOrdersControl, setStateOrders: React.Dispatch<() => IStateOrders>): IStateOrders {
    orders.onChangeOrders(setStateOrders);
    return orders.getStateOrders();
}

type Props = {
    maxOrdersCount: number;
} & WithStyles;

const useOrders = (maxOrdersCount: number) => {
    const [orders] = useState(() => new OrdersControl(maxOrdersCount) as IOrdersControl);
    const [, setState] = useState({} as IStateOrders);
    const [stateOrders] = useState(() => changeStateOrders(orders, setState));
    const [{ callbacksMessage, callbacksTabs, callbacksControls }] = useState(() => createCallbacks(orders));
    return { orders, stateOrders, callbacksMessage, callbacksTabs, callbacksControls };
};

function Orders({ classes, maxOrdersCount}: Props ) {;
    const { 
        orders, stateOrders, callbacksMessage, callbacksTabs, callbacksControls } = useOrders(maxOrdersCount);
    return (
        <OrdersControlContext.Provider value = {stateOrders}>
            <div className={classes.wrapper}>
                <div className='tabs-panel'>
                    <TabsNav callbacks={callbacksTabs}/>
                    <Message callbacks={callbacksMessage}/>
                    <HomeButton />
                </div>
                <div className='order-panel'>
                    <OrderControl orders={orders}/>
                    <Controls callbacks={callbacksControls} />
                </div>
            </div>
        </OrdersControlContext.Provider>
    );
}

export default withStyles(styles)(Orders);
