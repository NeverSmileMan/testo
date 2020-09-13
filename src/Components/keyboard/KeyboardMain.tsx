import React, { useState } from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';
import Keyboard from '../../data.structure/Keyboard';
import { 
    KeyboardLayoutOptionsEN, KeyboardLayoutOptionsUA,
    KeyboardLayoutOptionsNUMS, KeyboardLayoutOptionsFUNC
} from './KeyboardOptions';
import KeyboardLayout from './KeyboardLayout';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        height: '100%',
        display: 'flex',
        padding: '0.5rem',
        paddingRight: '1rem',
        '& .letters': {
            width: '60%',
            marginRight: '2%',
        },
        '& .nums': {
            flex: '1 0 0',
            marginRight: '1.8%',
        },
        '& .func': {
            width: '15%',
        },
    },
}));

const keyboard = Keyboard.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    let keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset['key'];
    key && keyboard.onClick(key);
};

let setLang: React.Dispatch<(lang: string) => string>;

const langHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const currentLang = target.dataset['nextLang'];
    if (!currentLang) return;
    setLang(() => currentLang);
    const nextLang = currentLang === 'UA' ? 'EN' : 'UA';
    target.setAttribute('data-next-lang', nextLang);
};

const DiffKeys = {
    'LANG': {
        content: 'EN',
        attr: {
            onClick: langHandler,
            'data-next-lang': 'EN',
        },
    },
};

const KeyboardLayoutUA = KeyboardLayout({ options: KeyboardLayoutOptionsUA });
const KeyboardLayoutEN = KeyboardLayout({ options: KeyboardLayoutOptionsEN });
const KeyboardLayoutNUMS = KeyboardLayout({ options: KeyboardLayoutOptionsNUMS });
const KeyboardLayoutFUNC = KeyboardLayout({
    options: KeyboardLayoutOptionsFUNC,
    diffKeys: DiffKeys,
});

function KeyboardMain({ classes }: WithStyles ) {
    let lang;
    [lang, setLang] = useState('UA');

    return (
        <div className={classes.wrapper} onClick={onClick}>
            <div className='letters'>
                {lang === 'UA' && <KeyboardLayoutUA />}
                {lang === 'EN' && <KeyboardLayoutEN />}
            </div>
            <div className='nums'>
                <KeyboardLayoutNUMS />
            </div>
            <div className='func'>
                <KeyboardLayoutFUNC />
            </div>
        </div>
    );
}

export default withStyles(styles)(KeyboardMain);
