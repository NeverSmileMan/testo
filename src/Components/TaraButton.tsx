import React, { useState } from 'react';
import Tara from '../data.structure/Tara';

const tara = Tara.getInstance();

const onClick = () => {
    tara.doTara();
}

function TaraButton() {
    const [, setState] = useState({});

    useState(() => {
        tara.on('stateChange', () =>
            setState({}))
    });

    const isActive = tara.isActive(); 

    return (
        <div
            className={`tara btn ${isActive ? '' : 'disabled'}`}
            onClick={onClick}>
            <div className='title'>TARA</div>
        </div>
    );
}

export default TaraButton;
