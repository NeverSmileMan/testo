import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tabs.panel/TabsNav';
import useTabsNav from '../../hooks/TabsNav';

export type Props = {
    callbacks: {
        createOrder: () => void;
        selectOrder: (orderNumber: number) => void;
    };
} & WithStyles;

function TabsNav({ classes, callbacks }: Props) {
    const {
        ordersNumbers, currentOrderNumber, canCreate, selectOrder,
    } = useTabsNav(callbacks);

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
