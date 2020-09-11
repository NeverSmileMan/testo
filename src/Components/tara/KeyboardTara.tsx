import React from 'react';
import KeyboardObject from '../../data.structure/Keyboard';
import KeyboardLayout from '../keyboard/KeyboardLayout';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { 
    KeyboardLayoutOptionsTaraNUMS,
    KeyboardLayoutOptionsTaraFUNC,
} from '../keyboard/KeyboardOptions';

const keyboard = KeyboardObject.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset['key'];
    key && keyboard.onClick(key);
};

const useStyles = makeStyles((theme: Theme) => ({
    'keyboard': {
        backgroundColor: '#f5f5f5',
        borderRadius: '0 0 10px 10px',
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

const KeyboardLayoutNUMS = KeyboardLayout({ options: KeyboardLayoutOptionsTaraNUMS, keyStyleName: 'taraNums' });
const KeyboardLayoutFUNC = KeyboardLayout({ options: KeyboardLayoutOptionsTaraFUNC, keyStyleName: 'taraFunc' });
function KeyboardTara({ containerClassName }: { containerClassName: string }) {
    const classes = useStyles();

    const className = `${classes.keyboard} ${containerClassName}`;

    return (
        <div className={className} onClick={onClick}>
            <div className='nums'>
                <KeyboardLayoutNUMS />
            </div>
            <div className='func'>
                <KeyboardLayoutFUNC />
            </div>
        </div>
    );
}

export default KeyboardTara;
