import React from 'react';
import KeyboardObject from '../../data.structure/Keyboard';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { KeyboardLayoutOptionsTARAFIX } from '../keyboard/KeyboardOptions';
import KeyboardLayout from '../keyboard/KeyboardLayout';

const useStyles = makeStyles((theme: Theme) => ({
    'keyboard': {
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        padding: '1rem 0.5rem',
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

function Keyboard({ containerClassName}: { containerClassName: string }) {
    const classes = useStyles();
    const className = `${classes.keyboard} ${containerClassName}`;
    return (
        <div className={className} onClick={onClick}>
            <KeyboardLayoutTARAFIX />
        </div>
    );
}

export default Keyboard;
