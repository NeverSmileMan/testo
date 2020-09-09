import React, { useState } from 'react';
import KeyboardObject from '../data.structure/Keyboard';
import KeyboardLayoutUA from './KeyboardLayoutUA';
import KeyboardLayoutEN from './KeyboardLayoutEN';
import KeyboardLayoutNUMS from './KeyboardLayoutNUMS';
import KeyboardLayoutFUNC from './KeyboardLayoutFUNC';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    'keyboard': {
        display: 'flex',
    },
});

const keyboard = KeyboardObject.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset['key'];
    key && keyboard.onClick(key);
};

const getLangHandler = (setLang: React.Dispatch<(lang: string) => string>) =>
    (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const nextLang = target.dataset['nextLang'];
        setLang((lang) => nextLang || lang);
};

function Keyboard() {
    const classes = useStyles();
    const [lang, setLang] = useState('UA');
    const [changeLang] = useState(() => getLangHandler(setLang));

    const nextLang = lang === 'UA' ? 'EN' : 'UA';
 
    return (
        <div className={`${classes.keyboard} keyboard`} onClick={onClick}>
            <div className='title'>KEYBOARD</div>
            {lang === 'UA' && <KeyboardLayoutUA />}
            {/* {lang === 'EN' && <KeyboardLayoutEN />} */}
            {/* <KeyboardLayoutEN /> */}
            <KeyboardLayoutNUMS />
            <KeyboardLayoutFUNC />
            <div className='key'
                onClick={changeLang}
                data-next-lang={nextLang}>
                {nextLang}
            </div>
        </div>
    );
}

export default Keyboard;
