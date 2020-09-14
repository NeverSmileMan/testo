import React, { useCallback, useContext } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tabs.panel/TabsNav';
import { IOrdersControl } from '../../data.structure/OrdersControlNew';
import { OrdersControlContext } from '../Orders';

const onSelect = (event: React.MouseEvent<HTMLDivElement>, selectOrder: (orderNumber: number) => void) => {
    const target = event.target as HTMLElement;
    const tabElem: HTMLDivElement | null = target.closest('[data-order-number]');
    const orderNumber = tabElem?.dataset.orderNumber;
    orderNumber && Number.parseInt(orderNumber) && selectOrder(+orderNumber);
    console.log('SELECT');
}

const createOrder = (createOrder: () => void) => createOrder();

const getState = (ordersControl: IOrdersControl) => ({
    ordersNumbers: [...ordersControl.getOrders().keys()],
    currentOrderNumber: ordersControl.getCurrentOrder()?.orderNumber,
    canCreate: ordersControl.canCreateOrder(),
});

type Props = {
    // value: { ordersControl: IOrdersControl };
    callbacks: {
        createOrder: () => void;
        selectOrder: (orderNumber: number) => void;
    };
} & WithStyles;

function TabsNav({ classes, callbacks }: Props) {
    
    // const { ordersControl } = value;

    const selectOrder = useCallback((event) => onSelect(event, callbacks.selectOrder), []);
    
    const { ordersNumbers, currentOrderNumber, canCreate } = useContext(OrdersControlContext);
    
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
                    onClick={callbacks.createOrder}>
                    +
                </div>
                : null
            }
        </div>
    );
}

export default withStyles(styles)(TabsNav);
