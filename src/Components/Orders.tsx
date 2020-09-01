import React from 'react';
import TabsNav from './TabsNav';
import Message from './Message';
import OrderControl from './OrderControl';
import Controls from './Controls';

function Orders() {
    return (
        <div className='orders'>
            ORDERS
            <TabsNav />
            <Message />
            <OrderControl />
            <Controls />
        </div>
    );
}

export default Orders;
