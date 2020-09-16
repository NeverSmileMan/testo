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

function createCallbacks(object: IOrdersControl) {
    const callbacksMessage = {
        onMessage: object.onMessage,
    };
    const callbacksControls = {
        deleteOrder: () => object.deleteOrder(),
        printOrder: () => object.printOrder(),
    };
    const callbacksTabs = {
        selectOrder: (orderNumber: number) => object.selectOrder(orderNumber),
        createOrder: () => object.createOrder(),
    }
    return { callbacksMessage, callbacksTabs, callbacksControls };
}

let setStateOrders: React.Dispatch<() => IStateOrders>;
let stateOrders: IStateOrders;
function changeStateOrders(object: IOrdersControl): IStateOrders {
    object.onChangeOrders(() => setStateOrders(object.getStateOrders));
    return object.getStateOrders();
}

type Props = {
    maxOrdersCount: number;
} & WithStyles;

function Orders({ classes, maxOrdersCount}: Props ) {
    const [object] = useState(() => new OrdersControl(maxOrdersCount));
    const [{ callbacksMessage, callbacksTabs, callbacksControls }] = useState(() => createCallbacks(object));
    [stateOrders, setStateOrders] = useState<IStateOrders>(() => changeStateOrders(object));
    return (
        <OrdersControlContext.Provider value = {stateOrders}>
            <div className={classes.wrapper}>
                <div className='tabs-panel'>
                    <TabsNav callbacks={callbacksTabs}/>
                    <Message callbacks={callbacksMessage}/>
                    <HomeButton />
                </div>
                <div className='order-panel'>
                    <OrderControl object={object}/>
                    <Controls callbacks={callbacksControls} />
                </div>
            </div>
        </OrdersControlContext.Provider>
    );
}

export default withStyles(styles)(Orders);
