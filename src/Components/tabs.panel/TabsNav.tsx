import React, { useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tabs.panel/TabsNav';
import OrdersControl, { IOrdersControl } from '../../data.structure/OrdersControl';

const ordersControl = OrdersControl.getInstance();

const createOrder = () => ordersControl.createOrder();

const selectOrder = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const tabElem: HTMLDivElement | null = target.closest('[data-order-number]');
    const orderNumber = tabElem?.dataset.orderNumber;
    orderNumber && Number.parseInt(orderNumber) && ordersControl.selectOrder(+orderNumber);
}

const getState = (ordersControl: IOrdersControl) => ({
    ordersNumbers: [...ordersControl.getOrders().keys()],
    currentOrderNumber: ordersControl.getCurrentOrder()?.orderNumber,
    canCreate: ordersControl.canCreateOrder(),
});

// let setState: React.Dispatch<typeof getState>;
// let state;
// const changeState = () => {
//     ordersControl.onChange(
//         () => setState(getState)
//     );
//     return getState();
// };

type Props = {
    value: { ordersControl: IOrdersControl };
} & WithStyles;

function TabsNav({ classes, value }: Props) {
    // [state, setState] = useState(changeState);

    // const { ordersNumbers, currentOrderNumber, canCreate } = state;
    const { ordersNumbers, currentOrderNumber, canCreate } = getState(value.ordersControl);
    const tabs = ordersNumbers.map(orderNumber =>
        <div
            className={`tab ${orderNumber === currentOrderNumber ? 'active' : ''}`}
            key={orderNumber}
            data-order-number={orderNumber}
            onClick={selectOrder}>
            {orderNumber}
        </div>
    );

    return (
        <div className={classes.wrapper}>
            {tabs}
            {canCreate ?
                <div 
                    className='tab'
                    onClick={createOrder}>
                    +
                </div>
                : null
            }
        </div>
    );
}

export default withStyles(styles)(TabsNav);
