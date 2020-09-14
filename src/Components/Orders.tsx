import React, { createContext, useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/Orders';
import OrdersControl, { IOrdersControl } from '../data.structure/OrdersControlNew';
import TabsNav from './tabs.panel/TabsNav';
import Message from './tabs.panel/Message';
import HomeButton from './tabs.panel/HomeButton';
import OrderControl from './order.control/OrderControl';
import Controls from './controls/Controls';
import { IItem, IItemAmount } from '../data.structure/Item';

const ordersControl = OrdersControl.getInstance();
const getState = () => ({
    printIsActive: ordersControl.printIsActive,
    closeIsActive: ordersControl.closeIsActive,
    ordersControl: ordersControl,
});
const callbacksControls = {
    deleteOrder: () => ordersControl.deleteOrder(),
    printOrder: () => ordersControl.printOrder(),
};
const callbacksOrder = {
    delItem: () => ordersControl.delItem(),
    addItem: (item: IItem) => ordersControl.addItem(item),
    selectItem: (index: number | null) => ordersControl.selectItem(index),
};

export const OrdersControlContext = createContext<IState>(getState());

interface IState {
    printIsActive: boolean,
    closeIsActive: boolean,
    ordersControl: IOrdersControl;
}
let setState: React.Dispatch<() => IState>;
let state: IState;

function changeState(): IState {
    ordersControl.onChangeOrders(() => setState(getState));
    return getState();
}

function Orders({ classes }: WithStyles ) {
    [state, setState] = useState<IState>(changeState);
    return (
        <OrdersControlContext.Provider value = {state}>
            <div className={classes.wrapper}>
                <div className='tabs-panel'>
                    <TabsNav value={state}/>
                    <Message />
                    <HomeButton />
                </div>
                <div className='order-panel'>
                    <OrdersControlContext.Consumer>
                        {(value) => <OrderControl value={value} callbacks={callbacksOrder}/>}
                    </OrdersControlContext.Consumer>
                    <Controls {...callbacksControls} />
                </div>
            </div>
        </OrdersControlContext.Provider>
    );
}

export default withStyles(styles)(Orders);
