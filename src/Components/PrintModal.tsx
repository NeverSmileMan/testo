import React from 'react';
import PrintObject from '../data.structure/Print';

const print = PrintObject.getInstance();

const onClick = () => {
    print.doPrint(true);
};

function PrintModal() {
    return (
        <div
            className='print modal'
            onClick={onClick}>
            PRINT MODAL
        </div>
    );
}

export default PrintModal;
