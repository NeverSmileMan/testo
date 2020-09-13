import React from 'react';
import { 
    createStyles, Theme,
    withStyles, WithStyles } from '@material-ui/core/styles';
import { 
    KeyboardLayoutOptionsTaraNUMS,
    KeyboardLayoutOptionsTaraFUNC,
} from '../keyboard/KeyboardOptions';
import Keyboard from '../../data.structure/Keyboard';
import KeyboardLayout from '../keyboard/KeyboardLayout';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        height: '100%',
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '0 0 0.5rem 0.5rem',
        display: 'flex',
        padding: '0.5rem',
        '& .nums': {
            width: '80%',
        },
        '& .func': {
            flex: '1 0 0',
        },
    },
}));
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
