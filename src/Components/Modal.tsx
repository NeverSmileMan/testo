import React, { useState } from 'react';
import { Mode } from '../data.structure/types';
import Tara from '../data.structure/Tara';
import Print from '../data.structure/Print';
import Close from '../data.structure/Close';
import TaraModal from './TaraModal';
import PrintModal from './PrintModal';
import CloseModal from './CloseModal';

const tara = Tara.getInstance();
const print = Print.getInstance();
const close = Close.getInstance();

function changeState(setModal: React.Dispatch<(modal: string) => string>) {
    tara.on('stateChange', () => {
        setModal((modal: string) => {
            if (tara.getMode() === Mode.MODAL) {
                return 'tara';
            } else if (modal === 'tara') {
                return 'none';
            }
            return modal;                
        });
    });
    close.on('stateChange', () => {
        setModal((modal: string) => {
            if (close.getMode() === Mode.MODAL) {
                return 'close';
            } else if (modal === 'close') {
                return 'none';
            }
            return modal;                
        });
    });
    print.on('stateChange', () => {
        setModal((modal: string) => {
            if (print.getMode() === Mode.MODAL) {
                return 'print';
            } else if (modal === 'print') {
                return 'none';
            }
            return modal;                
        });
    });
}

function Modal() {
    const [modal, setModal] = useState('none');

    useState(() => changeState(setModal));

    return (
        modal === 'tara' ? <TaraModal /> :
        modal === 'print' ? <PrintModal /> :
        modal === 'close' ? <CloseModal /> :
        null
    );

}

export default Modal;
