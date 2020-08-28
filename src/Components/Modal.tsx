import React, { useState, useEffect } from 'react';
import Close from '../data.structure/Close';
import Print from '../data.structure/Print';
import { Mode } from '../data.structure/types';
import CloseModal from './CloseModal';
import PrintModal from './PrintModal';

const close = Close.getInstance();
const tara = Print.getInstance();

function Modal() {
    const [modal, setModal] = useState('none');

    useState(() => {
        close.onStateChange(() => {
            if (close.getMode() === Mode.MODAL) {
                setModal('close');
                return;
            }
        });
        tara.onStateChange(() => {
            if (close.getMode() === Mode.MODAL) {
                setModal('tara');
                return;
            }
        })
    });
    useEffect(() => {
        setTimeout(() => close.doClose(), 5000);
    }, []);

    console.log("MODAL", modal);

    return (
        modal === 'close' ? <CloseModal /> :
        modal === 'tara' ? <PrintModal /> :
        null
    );

}

export default Modal;
