import React, { useState } from 'react';
import TabControl from '../data.structure/TabControl';

const tabControl = TabControl.getInstance();

function OrderInfo() {
    const [, setState] = useState({});

    useState(() => {
        tabControl.on('stateChange', () =>
            setState({}))
    });

    const isSelected = tabControl.isSelected();
    const total = <div>TOTAL: {tabControl.getTotal()}</div>;

    return (
        <div className='order-info'>
            ORDER INFO
            {isSelected ? <div>DEL</div> : total}
        </div>
    );
}

export default OrderInfo;
