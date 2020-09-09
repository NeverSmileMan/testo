import React, { useState } from 'react';
import app from '../data.structure/App';
import tabControl from '../data.structure/TabControl';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    'tabs-nav': {
        width: '55%',
        paddingTop: '.4rem',
        display: 'flex',
        '& [class*=tab]': {
            marginRight: '.2rem',
            width: '15%',
            height: '100%',
            borderRadius: '.3rem .3rem 0 0',
            fontSize: '1.2em',
            fontWeight: 'bolder',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e4e4e4',
            color: '#333',
            border: 'none',
            cursor: 'pointer',
        },
        '& .tab-active': {
            backgroundColor: theme.palette.primary.main,
            color: '#fff',
            outline: 'none',
        },
    },
}));

const ordersControl = app.getInstance().getOrdersControlInstance();
const currentOrderControl = tabControl.getInstance();

const createOrder = () => {
    ordersControl.createOrder();
}

const selectOrder = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const tabElem: HTMLDivElement | null = target.closest('[data-order-number]');
    const orderNumber = tabElem?.dataset['orderNumber'];
    orderNumber && Number.parseInt(orderNumber) && ordersControl.selectOrder(+orderNumber);
}

function TabsNav() {
    const classes = useStyles();
    const [, setState] = useState({});

    useState(() => {
        ordersControl.onChange(() =>
            setState({}))
    });

    const orders = ordersControl.getOrders();
    const currentOrderNumber = currentOrderControl.getOrderNumber();
    const canCreate = ordersControl.canCreateOrder();

    const tabs = Array.from(orders.keys()).map(orderNumber =>
        <div 
            className={`tab${(orderNumber === currentOrderNumber && '-active') || ''}`}
            key={orderNumber}
            data-order-number={orderNumber}
            onClick={selectOrder}>
            {orderNumber}
        </div>
    );

    return (
        <div className={classes['tabs-nav']}>
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

export default TabsNav;

// import TabControl from '../data.structure/TabControl';

// const tabControl = TabControl.getInstance();

// const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     const target = event.target as HTMLElement;
//     const itemElem: HTMLElement | null = target.closest('[data-item-index]');
//     const itemIndex = itemElem?.dataset['itemIndex'];
//     itemIndex && Number.parseInt(itemIndex) >=0 && tabControl.selectItem(+itemIndex);
// }

// function OrderItems() {
