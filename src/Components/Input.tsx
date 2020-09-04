import React, { useState, useEffect } from 'react';
import InputObject from '../data.structure/Input';
import List from './List';
import ActiveInputService from '../data.structure/ActiveInputService';

const input = InputObject.getInputListInstance();
const activeInputService = ActiveInputService.getInstance();
const ifFocus = () => ({ isFocus: activeInputService.ifActiveInput(input) });

function changeState(setState: React.Dispatch<(state: { isFocus: boolean}) => { isFocus: boolean}>) {
    input.onChange(() => {
        setState(state => ({ ...state }));
    });
    input.onFocusChange(() => {
        setState(ifFocus);
    });
    return () => activeInputService.delActiveInput(input);
}

function InputList() {
    const [{ isFocus }, setState] = useState(ifFocus);

    useEffect(() => changeState(setState), []);

    return (
        <div className='input-list'>
            <div className={`input ${isFocus ? 'focus' : ''}`}>
                {input.getValue()}
            </div>
            <List />
        </div>
    );
}

export default InputList;
