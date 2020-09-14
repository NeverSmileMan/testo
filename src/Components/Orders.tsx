import React, { createContext, useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/Orders';
import OrdersControl, { IOrdersControl } from '../data.structure/OrdersControl';
import TabsNav from './tabs.panel/TabsNav';
import Message from './tabs.panel/Message';
import HomeButton from './tabs.panel/HomeButton';
import OrderControl from './order.control/OrderControl';
import Controls from './controls/Controls';

const ordersControl = OrdersControl.getInstance();
const OrdersContext = createContext<State>({ ordersControl });

interface State {
    ordersControl: IOrdersControl;
}
let setState: React.Dispatch<() => State>;
let state: { ordersControl: IOrdersControl };

function changeState(): State {
    ordersControl.onChange(() => setState(() => ({ ordersControl })));
    return { ordersControl };
}

function Orders({ classes }: WithStyles ) {
    [state, setState] = useState<State>(changeState);
    return (
        <OrdersContext.Provider value = {state}>
            <div className={classes.wrapper}>
                <div className='tabs-panel'>
                    <TabsNav value={state}/>
                    <Message />
                    <HomeButton />
                </div>
                <div className='order-panel'>
                    <OrdersContext.Consumer>
                        {(value) => <OrderControl value={value}/>}
                    </OrdersContext.Consumer>
                    <Controls />
                </div>
            </div>
        </OrdersContext.Provider>
    );
}

export default withStyles(styles)(Orders);
