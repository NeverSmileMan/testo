import React, { useState } from 'react';
import CloseObject from '../data.structure/Close';

const close = CloseObject.getInstance();

const style: React.CSSProperties = {
    position: 'absolute',
    top: '100px',
    left: '100px',
    height: '100px',
    width: '100px',
    borderStyle: 'solid',
    borderColor: 'blue',
    borderWidth: '2px', 
}

const styleDisabled: React.CSSProperties = {
    backgroundColor: 'black',
}

const onClick = () => {
    close.doClose();
}

function CloseButton() {
    const [, setState] = useState({});

    useState(() => {
        close.onStateChange(() =>
            setState({}))
    });

    const isActive = close.isActive();

    return (
        <div style={isActive ? style : {...style, ...styleDisabled}} onClick={onClick}>
            <div>CLOSE</div>
        </div>
    );
}

export default CloseButton;
