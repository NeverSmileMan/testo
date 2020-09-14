import React, { useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/keyboard/KeyboardMain';
import Keyboard from '../../data.structure/Keyboard';
import { 
    KeyboardLayoutOptionsEN, KeyboardLayoutOptionsUA,
    KeyboardLayoutOptionsNUMS, KeyboardLayoutOptionsFUNC
} from './KeyboardOptions';
import KeyboardLayout from './KeyboardLayout';

const keyboard = Keyboard.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    let keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset['key'];
    key && keyboard.onClick(key);
};

let setLang: React.Dispatch<(lang: string) => string>;
let lang: string;
const changeLang = (event: React.MouseEvent<HTMLDivElement>) => {
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
            onClick: changeLang,
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
