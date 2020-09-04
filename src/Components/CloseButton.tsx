import React, { useState, useEffect } from 'react';
import Close from '../data.structure/Close';
import { Mode } from '../data.structure/types';
import ModalService from '../data.structure/ModalService';
import CloseModal from './CloseModal';

const close = Close.getInstance();
const modalService = ModalService.getInstance();

const onClick = () => {
    close.doClose();
}

function changeState(setState: React.Dispatch<() => { mode: Mode}>) {
    close.on('stateChange', () =>
        setState(() => ({ mode: close.getMode() }))
    );
}

function showModal(mode: Mode) {
    if (mode === Mode.MODAL)
        modalService.showModal(<CloseModal />);
    else modalService.showModal(null);
}

function CloseButton() {
    const [{ mode }, setState] = useState({ mode: Mode.BUTTON });

    useEffect(() => changeState(setState), []);

    useEffect(() => showModal(mode), [mode]);

    const isActive = close.isActive();

    return (
        <div
            className={`close btn ${isActive ? '' : 'disabled'}`}
            onClick={onClick}>
            <div className='title'>CLOSE</div>
        </div>
    );
}

export default CloseButton;
