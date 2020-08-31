import React from 'react';
import CloseObject from '../data.structure/Close';

const close = CloseObject.getInstance();

const onClick = () => {
    close.doClose(true);
};

function CloseModal() {
    return (
        <div
            className='close modal'
            onClick={onClick}>
            CLOSE MODAL
        </div>
    );
}

export default CloseModal;
