import React from 'react';
import TabsNav from './TabsNav';
import Message from './Message';
import OrderControl from './OrderControl';
import Controls from './Controls';

const style: React.CSSProperties = {
    top: '120px',
    left: '10px',
    height: '508px',
    width: '1000px',
}

function Weights() {
    return (
        <div className='weights' style={style}>
            ORDERS
            <TabsNav />
            <Message />
            <OrderControl />
            <Controls />
        </div>
    );
}

export default Weights;
