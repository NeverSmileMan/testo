import React, { useCallback } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tabs.panel/TabsNav';
import { IOrdersControl } from '../../data.structure/OrdersControl';

const selectOrder = (event: React.MouseEvent<HTMLDivElement>, selectOrder: (orderNumber: number) => void) => {
    const target = event.target as HTMLElement;
    const tabElem: HTMLDivElement | null = target.closest('[data-order-number]');
    const orderNumber = tabElem?.dataset.orderNumber;
    orderNumber && Number.parseInt(orderNumber) && selectOrder(+orderNumber);
}

const createOrder = (createOrder: () => void) => createOrder();

const getState = (ordersControl: IOrdersControl) => ({
    ordersNumbers: [...ordersControl.getOrders().keys()],
    currentOrderNumber: ordersControl.getCurrentOrder()?.orderNumber,
    canCreate: ordersControl.canCreateOrder(),
});

type Props = {
    value: { ordersControl: IOrdersControl };
} & WithStyles;

function TabsNav({ classes, value }: Props) {
    
    const { ordersControl } = value;

    const select = useCallback((event) => selectOrder(event, ordersControl.selectOrder.bind(ordersControl)), []);
    const create = useCallback(() => createOrder(ordersControl.createOrder.bind(ordersControl)), []);
    
    const { ordersNumbers, currentOrderNumber, canCreate } = getState(ordersControl);
    
    const tabs = ordersNumbers.map(orderNumber =>
        <div
            className={`tab ${orderNumber === currentOrderNumber ? 'active' : ''}`}
            key={orderNumber}
            data-order-number={orderNumber}
            onClick={select}>
            {orderNumber}
        </div>
    );

    return (
        <div className={classes.wrapper}>
            {tabs}
            {canCreate ?
                <div 
                    className='tab'
                    onClick={create}>
                    +
                </div>
                : null
            }
        </div>
    );
}

export default withStyles(styles)(TabsNav);
