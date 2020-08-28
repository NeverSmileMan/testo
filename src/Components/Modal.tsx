import React, { useState } from 'react';
import Close from '../data.structure/Close';
import Print from '../data.structure/Print';
import { Mode } from '../data.structure/types';
import CloseModal from './CloseModal';
import PrintModal from './PrintModal';

const close = Close.getInstance();
const print = Print.getInstance();

function changeState(setModal: React.Dispatch<(modal: string) => string>) {
    close.onStateChange(() => {
        console.log("CLOSE CALLBACK");
        setModal((modal: string) => {
            if (close.getMode() === Mode.MODAL) {
                return 'close';
            } else if (modal === 'close') {
                return 'none';
            }
            return modal;                
        });
    });
    print.onStateChange(() => {
        console.log("PRINT CALLBACK");
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

    console.log("MODAL", modal);

    return (
        modal === 'close' ? <CloseModal /> :
        modal === 'print' ? <PrintModal /> :
        null
    );

}

export default Modal;
