import React, { useState, useEffect } from 'react';
import ModalService from '../data.structure/ModalService';

const modalService = ModalService.getInstance();

function Modal(): React.ReactElement | null {
    const [, setState] = useState({});
    
    useEffect(() => {
        modalService.onShowModal(() => {
            setState({});
        });
    }, []);

    return modalService.getContent();
}

export default Modal;
