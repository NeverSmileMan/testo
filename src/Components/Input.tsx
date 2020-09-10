import React, { useState, useEffect, useRef } from 'react';
import InputObject from '../data.structure/Input';
import List from './List';
import ActiveInputService from '../data.structure/ActiveInputService';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    'input': {
        paddingLeft: '20px',
        paddingRight: '20px',
        fontWeight: 'bold',
        verticalAlign: 'middle',
        backgroundColor: 'white',
        borderRadius: '100px',
        flex: '1 0 0',
        fontSize: '1rem',
    },
    'focus': {
        '&:after': {
            content: "''",
            paddingLeft: '2px',
            animation: '$cursor 1s infinite',
            background: 'black',
            opacity: 0,
        },
    },
    '@keyframes cursor': {
        '0%': {opacity: 0},
        '40%': {opacity: 1},
        '100%': {opacity: 0},
    },
});

const input = InputObject.getInputListInstance();
const activeInputService = ActiveInputService.getInstance();
const ifFocus = () => activeInputService.ifActiveInput(input);

function changeState(setState: React.Dispatch<(state: boolean) => boolean>) {
    input.onFocusChange(() => setState(ifFocus));
    return () => activeInputService.delActiveInput(input);
}

function changeRef(ref: React.RefObject<HTMLDivElement>) {
    input.onChange(() => {
        if (ref.current) 
            ref.current.innerHTML = '&nbsp;' + input.getValue().replace(/ /g, '&nbsp;');
    });
}

function InputList() {
    const classes = useStyles();
    const [isFocus, setState] = useState(ifFocus);
    const ref = useRef(null);

    useEffect(() => changeState(setState), []);
    useEffect(() => changeRef(ref), []);

    return (
        <>
            <div ref={ref}
                className={`${classes.input} ${isFocus ? classes.focus : ''}`}>
                <span>&nbsp;</span>
            </div>
            <List />
        </>
    );
}

export default InputList;
