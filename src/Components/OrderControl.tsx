import React from 'react';
import OrderInfo from './OrderInfo';
import Input from './Input';
import OrderItems from './OrderItems';
import TabControl from '../data.structure/TabControl';

const tabControl = TabControl.getInstance();

const style: React.CSSProperties = {
    top: '80px',
    left: '0px',
    height: '424px',
    width: '850px',
}

function OrderControl() {
    return (
        <div className='order-control' style={style}>
            <OrderInfo />
            <Input />
            <OrderItems />
        </div>
    );
}

export default OrderControl;
