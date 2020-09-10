import React from 'react';
import KeyboardObject from '../data.structure/Keyboard';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { KeyboardLayoutOptionsTARAFIX } from './KeyboardLayoutOptions';
import KeyboardLayout from './KeyboardLayout';

const useStyles = makeStyles((theme: Theme) => ({
    'keyboard': {
        width: '56%',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        padding: '15px',
    },
}));

const keyboard = KeyboardObject.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset['key'];
    if (key) {
        keyboard.onClick('CLEAR');
        keyboard.onClick(key);
        keyboard.onClick('ENTER');
    }
};

const KeyboardLayoutTARAFIX = KeyboardLayout({ options: KeyboardLayoutOptionsTARAFIX, keyStyleName: 'taraFix' });

function Keyboard() {
    const classes = useStyles();

    return (
        <div className={classes.keyboard} onClick={onClick}>
            <KeyboardLayoutTARAFIX />
        </div>
    );
}

export default Keyboard;
