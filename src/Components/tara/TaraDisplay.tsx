import React, { useState, useEffect, useRef } from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';
import ActiveInputService from '../../data.structure/ActiveInputService';
import Input from '../../data.structure/Input';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        height: '100%',
        backgroundColor: theme.palette.primary.main,
        padding: '1rem 1.5rem 0.3rem',
        borderRadius: '10px 10px 0 0',
        display: 'flex',
        justifyContentL: 'center',
        alignItems: 'center',
        '& .head': {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            marginLeft: '0.5rem',
        },
        '& .input': {
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            fontWeight: 'bold',
            verticalAlign: 'middle',
            backgroundColor: 'white',
            borderRadius: '100px',
            fontSize: '1.2rem',
            flex: '1 0 0',
        },
        '& .focus': {
            '&:after': {
                content: "''",
                paddingLeft: '2px',
                animation: '$cursor 1s infinite',
                background: 'black',
                opacity: 0,
            },
        },
    },
    '@keyframes cursor': {
        '0%': {opacity: 0},
        '40%': {opacity: 1},
        '100%': {opacity: 0},
    },
}));

const input = Input.getInputNumberInstance();
const activeInputService = ActiveInputService.getInstance();
const ifFocus = () => activeInputService.ifActiveInput(input);
const getValue = () => (input.getValue() / 1000).toFixed(3);

let setState: React.Dispatch<() => boolean>;
let isFocus: boolean;
let ref: React.RefObject<HTMLDivElement>;
function changeState() {
    input.onFocusChange(() => setState(ifFocus));
    input.onChange(() => {
        if (ref.current) 
            ref.current.innerHTML = getValue();
    });
    return ifFocus();
}

function TaraDisplay({ classes }: WithStyles) {
    [isFocus, setState] = useState(changeState);
    ref = useRef(null);

    useEffect(() => {
        if (ref.current) ref.current.innerHTML = getValue();
        activeInputService.setActiveInput(input);
        return () => activeInputService.delActiveInput(input);
    });
    
    return (
        <div className={classes.wrapper}>
            <div
                ref={ref}
                className={'input ' + (isFocus ? 'focus' : '')}>
            </div>
        </div>
    );
};

export default withStyles(styles)(TaraDisplay);
