import React, { useState, useEffect } from 'react';
import InputObject from '../data.structure/Input';
import KeyboardTara from './KeyboardTara';
import ActiveInputService from '../data.structure/ActiveInputService';

const input = InputObject.getInputNumberInstance();
const activeInputService = ActiveInputService.getInstance();

function TaraModal() {
    const [, setState] = useState({});

    useState(() => {
        input.onChange(() =>
            setState({}))
    });

    const isFocus = activeInputService.ifActiveInput(input);

    useEffect(() => () => activeInputService.delActiveInput(input), []);

    return (
        <div className='tara modal'>
            <div className='set-tara'>    
                SET TARA
                <div className={`input ${isFocus ? 'focus' : ''}`}>
                    {input.getValue()}
                </div>
                <KeyboardTara />
            </div>
        </div>
    );
}

export default TaraModal;
