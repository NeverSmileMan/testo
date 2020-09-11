import React from 'react';
import TabsNav from './tabs.panel/TabsNav';
import Message from './tabs.panel/Message';
import HomeButton from './tabs.panel/HomeButton';
import OrderControl from './orders/OrderControl';
import Controls from './controls/Controls';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    'orders': {
        '& .tabs-panel': {
            height: '14%',
            display: 'flex',
        },
        '& .order-panel': {
            height: '86%',
            display: 'flex',
        },
    },
});

function Orders() {
    const classes = useStyle();
    const className = classes.orders + ' orders';
    return (
        <div className={className}>
            {/* <div className='head title'>ORDERS</div> */}
            <div className='tabs-panel'>
                <TabsNav />
                <Message />
                <HomeButton />
            </div>
            <div className='order-panel'>
                <OrderControl />
                <Controls />
            </div>
        </div>
    );
}

export default Orders;
