import React from 'react';
import { 
    createStyles, Theme,
    withStyles, WithStyles } from '@material-ui/core/styles';
import Keyboard from '../../data.structure/Keyboard';
import { KeyboardLayoutOptionsTARAFIX } from '../keyboard/KeyboardOptions';
import KeyboardLayout from '../keyboard/KeyboardLayout';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        height: '100%',
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '0.5rem',
        padding: '1rem 0.5rem',
    },
}));

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
