import React, { useState, useEffect } from 'react';
import InputObject from '../data.structure/Input';
import List from './List';
import ActiveInputService from '../data.structure/ActiveInputService';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    'input-list': {
        backgroundColor: 'rgb(0, 153, 255)',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontWeight: 'bold',
        verticalAlign: 'middle',
        backgroundColor: 'white',
        borderRadius: '100px',
        flex: '1 0 0',
        '&:after': {
            content: "''",
            display: 'inline',
            paddingLeft: '2px',
            animationName: 'caret-animation',
            animationDuration: '1s',
            animationDelay: '0s',
            animationIterationCount: 'infinite',
        },
    },
});

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
    const classes = useStyles();
    const [{ isFocus }, setState] = useState(ifFocus);

    useEffect(() => changeState(setState), []);

    return (
        <div className={`${classes['input-list']} input-list`}>
            <div className={`${classes.input} input ${isFocus ? 'focus' : ''}`}>
                {input.getValue()}
            </div>
            <List />
        </div>
    );
}

export default InputList;
