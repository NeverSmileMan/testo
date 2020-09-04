import React from 'react';
import TabControlObject from '../data.structure/TabControl';

const tabControl = TabControlObject.getInstance();

function TabControlModal() {
    return (
        <div
            className='order-control modal'>
            TAB CONTROL MODAL
        </div>
    );
}

export default TabControlModal;
