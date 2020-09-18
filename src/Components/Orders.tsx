import React, { createContext } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/Orders';
import { IStateOrders } from '../data.structure/OrdersControl';
import useOrders from '../hooks/OrdersControl';
import TabsNav from './tabs.panel/TabsNav';
import Message from './tabs.panel/Message';
import HomeButton from './tabs.panel/HomeButton';
import OrderControl from './order.control/OrderControl';
import Controls from './controls/Controls';

export const OrdersControlContext = createContext<IStateOrders>({} as IStateOrders);

type Props = {
    maxOrdersCount: number;
} & WithStyles;

function Orders({ classes, maxOrdersCount}: Props ) {;
    const { 
        stateOrders, callbacksTabs,
        callbacksControls, orderControl,
    } = useOrders(maxOrdersCount);

    return (
        <OrdersControlContext.Provider value = {stateOrders}>
            <div className={classes.wrapper}>
                <div className='tabs-panel'>
                    <TabsNav callbacks={callbacksTabs}/>
                    <Message />
                    <HomeButton />
                </div>
                <div className='order-panel'>
                    <OrderControl orderControl={orderControl}/>
                    <Controls callbacks={callbacksControls} />
                </div>
            </div>
        </OrdersControlContext.Provider>
    );
}

export default withStyles(styles)(Orders);
