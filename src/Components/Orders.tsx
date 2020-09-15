import React, { createContext, useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/Orders';
import OrdersControl, { IOrdersControl } from '../data.structure/OrdersControl';
import TabsNav from './tabs.panel/TabsNav';
import Message from './tabs.panel/Message';
import HomeButton from './tabs.panel/HomeButton';
import OrderControl from './order.control/OrderControl';
import Controls from './controls/Controls';
import { IItem, IItemAmount } from '../data.structure/Item';
import { IOrder } from '../data.structure/Order';
import { Mode, State } from '../data.structure/types/types';

export const OrderControlContext = createContext<IStateOrder>({} as IStateOrder);
export const OrdersControlContext = createContext<IState>({} as IState);

const ordersControl = OrdersControl.getInstance();

const callbacksControls = {
    deleteOrder: () => ordersControl.deleteOrder(),
    printOrder: () => ordersControl.printOrder(),
};
const callbacksOrder = {
    delItem: () => ordersControl.delItem(),
    addItem: (item: IItem) => ordersControl.addItem(item),
    selectItem: (index: number | null) => ordersControl.selectItem(index),
};
const callbacksTabs = {
    selectOrder: (orderNumber: number) => ordersControl.selectOrder(orderNumber),
    createOrder: () => ordersControl.createOrder(),
}

interface IStateOrder {
    isSelected: boolean,
    total: string,
    orderItems: IItemAmount[],
    selectedItemIndex: number | null,
    orderMode: Mode | null,
}

const getStateOrder = (): IStateOrder => ({
    isSelected: ordersControl.isSelected(),
    total: ordersControl.getTotal().toFixed(2),
    orderItems: ordersControl.getItems(),
    selectedItemIndex: ordersControl.getSelectedItemIndex(),
    orderMode: ordersControl.getState() === State.PENDING ? Mode.MODAL : null,
});

let setStateOrder: React.Dispatch<() => IStateOrder>;
let stateOrder: IStateOrder;
function changeStateOrder() {
    ordersControl.onChange(() => setStateOrder(getStateOrder));
    return getStateOrder();
}

interface IState {
    order: IOrder | null;
    printIsActive: boolean;
    closeIsActive: boolean;
    //ordersControl: IOrdersControl;
    ordersNumbers: number[];
    currentOrderNumber: number | null;
    canCreate: boolean;
}

const getState = () => ({
    order: ordersControl.getCurrentOrder(),
    printIsActive: ordersControl.printIsActive,
    closeIsActive: ordersControl.closeIsActive,
    //ordersControl: ordersControl,
    ordersNumbers: [...ordersControl.getOrders().keys()],
    currentOrderNumber: ordersControl.getOrderNumber(),
    canCreate: ordersControl.canCreateOrder(),
});

let setState: React.Dispatch<() => IState>;
let state: IState;
function changeState(): IState {
    ordersControl.onChangeOrders(() => setState(getState));
    return getState();
}

function Orders({ classes }: WithStyles ) {
    [state, setState] = useState<IState>(changeState);
    [stateOrder, setStateOrder] = useState<IStateOrder>(changeStateOrder)
    return (
        <OrdersControlContext.Provider value = {state}>
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
