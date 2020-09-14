import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tara/KeyboardTara';
import { 
    KeyboardLayoutOptionsTaraNUMS,
    KeyboardLayoutOptionsTaraFUNC,
} from '../keyboard/KeyboardOptions';
import Keyboard from '../../data.structure/Keyboard';
import KeyboardLayout from '../keyboard/KeyboardLayout';

const keyboard = Keyboard.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset['key'];
    key && keyboard.onClick(key);
};

const KeyboardLayoutNUMS = KeyboardLayout({
    options: KeyboardLayoutOptionsTaraNUMS,
    keyClassName: 'taraNums',
});
const KeyboardLayoutFUNC = KeyboardLayout({
    options: KeyboardLayoutOptionsTaraFUNC,
    keyClassName: 'taraFunc',
});

function KeyboardTara({ classes }: WithStyles) {

    return (
        <div className={classes.wrapper} onClick={onClick}>
            <div className='nums'>
                <KeyboardLayoutNUMS />
            </div>
            <div className='func'>
                <KeyboardLayoutFUNC />
            </div>
        </div>
    );
}

export default withStyles(styles)(KeyboardTara);
