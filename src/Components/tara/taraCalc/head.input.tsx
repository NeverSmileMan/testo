import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import KeyboardObject from '../../../data.structure/Keyboard';
// import KeyboardLayoutNUMS from './KeyboardLayoutNUMS';
// import KeyboardLayoutFUNC from './KeyboardLayoutFUNC';
import InputObject from '../../../data.structure/Input';
//import KeyboardTara from './KeyboardTara';
import ActiveInputService from '../../../data.structure/ActiveInputService';

const keyboard = KeyboardObject.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // const target = event.target as HTMLElement;
    // const keyElem: HTMLElement | null = target.closest('[data-key]');
    // const key = keyElem?.dataset['key'];
    // key && keyboard.onClick(key);
    keyboard.onClick('CLEAR');
    keyboard.onClick('ENTER');
};

const input = InputObject.getInputNumberInstance();
const activeInputService = ActiveInputService.getInstance();

const useStyle = makeStyles({
    'input': {
        backgroundColor: '#fff',
        borderRadius: '15px',
        height: '30px',
        fontSize: '0.5em', //??
        color: 'black', //??
    },
    'head': {
        display: 'flex',
        justifyContent: 'space-between;',
        marginBottom: '15px',
    },
    'inputHead': {
        backgroundColor: 'rgb(0, 153, 255)',
        height: '110px',
        padding: '0 10px',
        borderRadius: '10px 10px 0 0',
    },
});

const InputHead = () => {
    const { input: inputStyle, head, inputHead } = useStyle();
    const [, setState] = useState({});

    useState(() => {
        input.onChange(() =>
            setState({}))
    });

    const isFocus = activeInputService.ifActiveInput(input);

    useEffect(() => () => activeInputService.delActiveInput(input), []);
    return (
        <div className={inputHead}>
            <div className={head}>
                <div>Тара</div>
                <div onClick={onClick}>&#10005;</div>
            </div>
            <div className={inputStyle}>
                <div>{input.getValue()}</div>
            </div>
        </div>
    );
};

export default InputHead;

{/* <div className={`input ${isFocus ? 'focus' : ''}`}>
    {input.getValue()}
</div> */}
