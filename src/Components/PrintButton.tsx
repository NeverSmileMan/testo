import React, { useState, useEffect } from 'react';
import Print from '../data.structure/Print';
import { Mode } from '../data.structure/types';
import ModalService from '../data.structure/ModalService';
import PrintModal from './PrintModal';

const print = Print.getInstance();
const modalService = ModalService.getInstance();

const onClick = () => {
    print.doPrint();
}

function changeState(setState: React.Dispatch<() => { mode: Mode}>) {
    print.on('stateChange', () =>
        setState(() => ({ mode: print.getMode() }))
    );
}

function showModal(mode: Mode) {
    if (mode === Mode.MODAL)
        modalService.showModal(<PrintModal />);
    else modalService.showModal(null);
}

function PrintButton() {
    const [{ mode }, setState] = useState({ mode: Mode.BUTTON });

    useEffect(() => changeState(setState), []);

    useEffect(() => showModal(mode), [mode]);

    const isActive = print.isActive();

    return (
        <div
            className={`print btn ${isActive ? '' : 'disabled'}`}
            onClick={onClick}>
            <div className='title'>PRINT</div>
        </div>
    );
}

export default PrintButton;
