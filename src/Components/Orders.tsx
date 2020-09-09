import React from 'react';
import TabsNav from './TabsNav';
import Message from './Message';
import Home from './Home';
import OrderControl from './OrderControl';
import Controls from './Controls';
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
                <Home />
            </div>
            <div className='order-panel'>
                <OrderControl />
                <Controls />
            </div>
        </div>
    );
}

export default Orders;
