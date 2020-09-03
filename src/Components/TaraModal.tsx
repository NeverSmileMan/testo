import React, { useState } from 'react';
import TaraObject from '../data.structure/Tara';
import InputObject from '../data.structure/Input';
import KeyboardTara from './KeyboardTara';

const close = TaraObject.getInstance();
const input = InputObject.getInputNumberInstance();

function TaraModal() {
    const [, setState] = useState({});

    useState(() => {
        input.onChange(() =>
            setState({}))
    });

    return (
        <div className='tara modal'>
            <div className='set-tara'>    
                SET TARA
                <div className='input'>{input.getValue()}</div>
                <KeyboardTara />
            </div>
        </div>
    );
}

export default TaraModal;
