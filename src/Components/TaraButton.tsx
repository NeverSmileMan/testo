import React, { useState } from 'react';
import Tara from '../data.structure/Tara';

const tara = Tara.getInstance();

const style: React.CSSProperties = {
    top: '0px',
    left: '0px',
    height: '140px',
    width: '142px',
}

const onClick = () => {
    tara.doTara();
}

function TaraButton() {
    const [, setState] = useState({});

    useState(() => {
        tara.onStateChange(() =>
            setState({}))
    });

    const isActive = tara.isActive(); 

    return (
        <div
            className={`tara btn ${isActive || 'disabled'}`}
            style={style}
            onClick={onClick}>
            <div>Tara</div>
        </div>
    );
}

export default TaraButton;
