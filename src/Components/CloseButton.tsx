import React, { useState } from 'react';
import Close from '../data.structure/Close';

const close = Close.getInstance();

const onClick = () => {
    close.doClose();
}

function CloseButton() {
    const [, setState] = useState({});

    useState(() => {
        close.on('stateChange', () => {
            setState({}); 
        });
    });

    const isActive = close.isActive();

    return (
        <div
            className={`close btn ${isActive ? '' : 'disabled'}`}
            onClick={onClick}>
            <div>CLOSE</div>
        </div>
    );
}

export default CloseButton;
