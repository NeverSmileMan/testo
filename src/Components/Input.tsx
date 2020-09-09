import React, { useState, useEffect } from 'react';
import InputObject from '../data.structure/Input';
import List from './List';
import ActiveInputService from '../data.structure/ActiveInputService';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    input: {
        paddingLeft: '20px',
        paddingRight: '20px',
        fontWeight: 'bold',
        verticalAlign: 'middle',
        backgroundColor: 'white',
        borderRadius: '100px',
        flex: '1 0 0',
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

    const value = input.getValue();

    const match = (value).match(/ +$/);
    let emptyText = [];
    if (match) {
        const index = match && match.index;
        const empty = <>&nbsp;</>;
        emptyText = Array(value.length - index!).fill(empty);       
    }

    return (
        <>
            <div className={`${classes.input} input ${isFocus ? 'focus' : ''}`}>
                {input.getValue()} {emptyText}
            </div>
            <List />
        </>
    );
}

export default InputList;
