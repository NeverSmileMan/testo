import React, { useState } from 'react';
import InputList from '../data.structure/Input';

const input = InputList.getInstance();

function Input() {
    const [, setState] = useState({});

    useState(() => {
        input.onChange(() => {
            setState({});
        });
    });

    return (
        <div className='input'>
            {input.getValue()}
        </div>
    );
}

export default Input;

// .multi-code-main-input:after {
//     content: "";
//     display: inline;
//     padding-left: .15rem;
//     height: 2.5rem;
//     background-color: #000;
//     -webkit-animation-name: caret-animation;
//     animation-name: caret-animation;
//     -webkit-animation-duration: 1s;
//     animation-duration: 1s;
//     -webkit-animation-delay: 0s;
//     animation-delay: 0s;
//     -webkit-animation-iteration-count: infinite;
//     animation-iteration-count: infinite;
// }