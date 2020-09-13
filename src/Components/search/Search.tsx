import React, { useState, useEffect, useRef } from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';
import ActiveInputService from '../../data.structure/ActiveInputService';
import Input from '../../data.structure/Input';
import List from './List';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        backgroundColor: theme.palette.primary.main,
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 1.5rem',
        '& .input': {
            flex: '1 0 0',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '100px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
        },
        '& .focus:after': {
            content: "''",
            paddingLeft: '3px',
            animation: '$cursor 1s infinite',
            background: theme.palette.secondary.dark,
            opacity: 0,
        },
    },
    '@keyframes cursor': {
        '0%': {opacity: 0},
        '40%': {opacity: 1},
        '100%': {opacity: 0},
    },
}));

const input = Input.getInputListInstance();
const activeInputService = ActiveInputService.getInstance();
const ifFocus = () => activeInputService.ifActiveInput(input);
const getValue = () => input.getValue().replace(/ /g, '&nbsp;');

let setState: React.Dispatch<() => boolean>;
let ref: React.RefObject<HTMLDivElement>;
function changeState() {
    input.onFocusChange(() => setState(ifFocus));
    input.onChange(() => {
        if (ref.current) 
            ref.current.innerHTML = getValue();
    });
    return ifFocus();
}

function Search({ classes}: WithStyles) {
    let isFocus;
    [isFocus, setState] = useState(changeState);
    ref = useRef(null);

    useEffect(() => {
        if (ref.current) ref.current.innerHTML = getValue();
        activeInputService.setActiveInput(input);
        return () => activeInputService.delActiveInput(input);
    });

    return (
        <div className={classes.wrapper}>
            <div ref={ref}
                className={`input ${isFocus ? 'focus' : ''}`}>
            </div>
            <List />
        </div>
    );
}

export default withStyles(styles)(Search);
