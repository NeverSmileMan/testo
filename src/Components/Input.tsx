import React, { PropsWithChildren, useState } from 'react';
import InputObject from '../data.structure/Input';
import List from './List';

const input = InputObject.getInputListInstance();

function Input() {
    const [, setState] = useState({});

    useState(() => {
        input.onChange(() => {
            setState({});
        });
    });

    return (
        <div className='input-list'>
            <div className='input'>
                {input.getValue()}
            </div>
            <List />
        </div>
    );
}

export default Input;
