import React from 'react';
import OrderInfo from './OrderInfo';
import Input from './Input';
import OrderItems from './OrderItems';
import TabControl from '../data.structure/TabControl';

const tabControl = TabControl.getInstance();

function OrderControl() {
    return (
        <div className='order-control'>
            <Input />
            <OrderInfo />
            <OrderItems />
        </div>
    );
}

export default OrderControl;
