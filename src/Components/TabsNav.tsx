import React, { useState } from 'react';
import app from '../data.structure/App';
import tabControl from '../data.structure/TabControl';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    'tabs-nav': {
        width: '50%',
        paddingTop: '0.2%',
        backgroundColor: 'red',
        '& .tab': {
            textAlign: 'center',
            cursor: 'pointer',
            display: 'inline-block',
            width: '60px',
            height: '100%',
            backgroundColor: 'green',
            color: 'white',
            marginRight: '1px',
            '& .active': {
                backgroundColor: 'green',
            },
        },
    },
});

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
    const classes = useStyle();
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
            className={`tab ${(orderNumber === currentOrderNumber && 'active') || ''}`}
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
                    className='tab create'
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
