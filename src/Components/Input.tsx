import React, { useState } from 'react';
import InputList from '../data.structure/Input';

const input = InputList.getInstance();

const style: React.CSSProperties = {
    top: '0px',
    left: '0px',
    height: '50px',
    width: '546px',
}

function Input() {
    const [, setState] = useState({});

    useState(() => {
        input.onChange(() => {
            setState({});
        });
    });

    return (
        <div className='input' style={style}>
            {input.getValue()}
        </div>
    );
}

export default Input;
