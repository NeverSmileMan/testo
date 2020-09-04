import React, { useState, useEffect } from 'react';
import OrderInfo from './OrderInfo';
import Input from './Input';
import OrderItems from './OrderItems';
import TabControl from '../data.structure/TabControl';
import { Mode } from '../data.structure/types';
import ModalService from '../data.structure/ModalService';
import TabControlModal from './TabControlModal';

const tabControl = TabControl.getInstance();
const modalService = ModalService.getInstance();

function changeState(setState: React.Dispatch<() => Mode | null>) {
    tabControl.on('stateChange', () =>
        setState(() => tabControl.getMode())
    );
}

function showModal(mode: Mode | null) {
    if (mode === Mode.MODAL)
        modalService.showModal(<TabControlModal />);
    else modalService.showModal(null);
}

function OrderControl() {
    const [mode, setState] = useState(null as any as Mode | null);
    
    useEffect(() => changeState(setState), []);
    
    useEffect(() => showModal(mode), [mode]);

    return (
        <div className='order-control'>
            <Input />
            <OrderInfo />
            <OrderItems />
        </div>
    );
}

export default OrderControl;
