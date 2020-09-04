import React, { useState, useEffect } from 'react';
import Tara from '../data.structure/Tara';
import { Mode } from '../data.structure/types';
import ModalService from '../data.structure/ModalService';
import TaraModal from './TaraModal';

const tara = Tara.getInstance();
const modalService = ModalService.getInstance();

const onClick = () => {
    tara.doTara();
}

function changeState(setState: React.Dispatch<() => { mode: Mode}>) {
    tara.on('stateChange', () =>
        setState(() => ({ mode: tara.getMode() }))
    );
}

function showModal(mode: Mode) {
    if (mode === Mode.MODAL)
        modalService.showModal(<TaraModal />);
    else modalService.showModal(null);
}

function TaraButton() {
    const [{ mode }, setState] = useState({ mode: Mode.BUTTON });

    useEffect(() => changeState(setState), []);

    useEffect(() => showModal(mode), [mode]);

    const isActive = tara.isActive(); 

    return (
        <div
            className={`tara btn ${isActive ? '' : 'disabled'}`}
            onClick={onClick}>
            <div className='title'>TARA</div>
        </div>
    );
}

export default TaraButton;
