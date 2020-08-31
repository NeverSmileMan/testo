import React, { useState } from 'react';
import Print from '../data.structure/Print';

const print = Print.getInstance();

const style: React.CSSProperties = {
    top: '140px',
    left: '0px',
    height: '140px',
    width: '142px',
}

const onClick = () => {
    print.doPrint();
}

function PrintButton() {
    const [, setState] = useState({});

    useState(() => {
        print.on('stateChange', () =>
            setState({}))
    });

    const isActive = print.isActive();

    return (
        <div
            className={`print btn ${isActive || 'disabled'}`}
            style={style}
            onClick={onClick}>
            <div>PRINT</div>
        </div>
    );
}

export default PrintButton;
