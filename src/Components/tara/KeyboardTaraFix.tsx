import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tara/KeyboardTaraFix';
import Keyboard from '../../data.structure/Keyboard';
import { KeyboardLayoutOptionsTARAFIX } from '../keyboard/KeyboardOptions';
import KeyboardLayout from '../keyboard/KeyboardLayout';

const keyboard = Keyboard.getInstance();

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

const KeyboardLayoutTARAFIX = KeyboardLayout({
    options: KeyboardLayoutOptionsTARAFIX,
    keyClassName: 'taraFix',
});

function KeyboardTaraFix({ classes }: WithStyles) {

    return (
        <div className={classes.wrapper} onClick={onClick}>
            <KeyboardLayoutTARAFIX />
        </div>
    );
}

export default withStyles(styles)(KeyboardTaraFix);
