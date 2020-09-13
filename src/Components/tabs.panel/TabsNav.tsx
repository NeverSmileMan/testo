import React, { useState } from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles } from '@material-ui/core/styles';
import OrdersControl from '../../data.structure/OrdersControl';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        width: '55%',
        paddingTop: '.4rem',
        display: 'flex',
        '& .tab': {
            marginRight: '.2rem',
            width: '15%',
            borderRadius: '.3rem .3rem 0 0',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.dark,
            cursor: 'pointer',
        },
        '& .active': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
        },
    },
}));

const ordersControl = OrdersControl.getInstance();

const createOrder = () => ordersControl.createOrder();

const selectOrder = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const tabElem: HTMLDivElement | null = target.closest('[data-order-number]');
    const orderNumber = tabElem?.dataset.orderNumber;
    orderNumber && Number.parseInt(orderNumber) && ordersControl.selectOrder(+orderNumber);
}

const getState = () => ({
    ordersNumbers: [...ordersControl.getOrders().keys()],
    currentOrderNumber: ordersControl.getCurrentOrder().orderNumber,
    canCreate: ordersControl.canCreateOrder(),
});

let setState: React.Dispatch<typeof getState>;
let state;
const changeState = () => {
    ordersControl.onChange(
        () => setState(getState)
    );
    return getState();
};

function TabsNav({ classes }: WithStyles) {
    [state, setState] = useState(changeState);

    const { ordersNumbers, currentOrderNumber, canCreate } = state;

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
