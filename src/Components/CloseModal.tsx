import React from 'react';
import CloseObject from '../data.structure/Close';

const close = CloseObject.getInstance();

const style: React.CSSProperties = {
    height: '100vh',
    width: '100%',
    zIndex: 9999,
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.5)',
    left: 0,
    top: 0,
};

const onClick = () => {
    close.doClose(true);
};

function CloseModal() {
    return (
        <div style={style} onClick={onClick}>
            CLOSE MODAL
        </div>
    );
}

export default CloseModal;
