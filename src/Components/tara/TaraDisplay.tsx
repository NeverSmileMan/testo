import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import KeyboardObject from '../../data.structure/Keyboard';
import InputObject from '../../data.structure/Input';
import ActiveInputService from '../../data.structure/ActiveInputService';

const keyboard = KeyboardObject.getInstance();

// const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     keyboard.onClick('CLEAR');
//     keyboard.onClick('ENTER');
// };

const input = InputObject.getInputNumberInstance();
const activeInputService = ActiveInputService.getInstance();
const ifFocus = () => activeInputService.ifActiveInput(input);
const getValue = () => (input.getValue() / 1000).toFixed(3);

function changeState(setState: React.Dispatch<(state: boolean) => boolean>) {
    input.onFocusChange(() => setState(ifFocus));
    return () => activeInputService.delActiveInput(input);
}

function changeRef(ref: React.RefObject<HTMLDivElement>) {
    if (ref.current) ref.current.innerHTML = getValue();
    input.onChange(() => {
        if (ref.current) 
            ref.current.innerHTML = getValue();
    });
}

const useStyle = makeStyles((theme: Theme) => ({
    'display': {
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

function TaraDisplay({ containerClassName }: { containerClassName: string}) {
    const classes = useStyle();
    const [isFocus, setState] = useState(ifFocus);
    const ref: React.RefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        changeRef(ref);
        return changeState(setState);
    }, []);
    
    const className = `${classes.display} ${containerClassName}`;
    return (
        <div className={className}>
            {/* <div className='head'>
                <div>Тара</div>
                <div onClick={onClick}>&#10005;</div>
            </div> */}
            <div
                ref={ref}
                className={'input ' + (isFocus ? 'focus' : '')}>
            </div>
        </div>
    );
};

export default TaraDisplay;
