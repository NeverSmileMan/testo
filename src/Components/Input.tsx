import React, { PropsWithChildren, useState } from 'react';
import InputList from '../data.structure/Input';
import List from './List';

const input = InputList.getInstance();

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
