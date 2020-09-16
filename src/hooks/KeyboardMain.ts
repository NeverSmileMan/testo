import React, { useState } from 'react';
import Keyboard from '../data.structure/Keyboard';
import {
    KeyboardLayoutOptionsEN,
    KeyboardLayoutOptionsUA,
    KeyboardLayoutOptionsNUMS,
    KeyboardLayoutOptionsFUNC,
} from '../components/keyboard/KeyboardOptions';
import KeyboardLayout from '../components/keyboard/KeyboardLayout';

export const KeyboardLayoutUA = KeyboardLayout({ options: KeyboardLayoutOptionsUA });
export const KeyboardLayoutEN = KeyboardLayout({ options: KeyboardLayoutOptionsEN });
export const KeyboardLayoutNUMS = KeyboardLayout({ options: KeyboardLayoutOptionsNUMS });

const keyboard = Keyboard.getInstance();

export const keyboardOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    let keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset['key'];
    key && keyboard.onClick(key);
};

const getChangeLang = (setLang: React.Dispatch<() => string>) =>
    (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const currentLang = target.dataset['nextLang'];
        if (!currentLang) return;
        setLang(() => currentLang);
        const nextLang = currentLang === 'UA' ? 'EN' : 'UA';
        target.innerHTML = nextLang;
    };

const getKeyboardLayoutFUNC = (changeLang: React.MouseEventHandler<HTMLDivElement>) => {
    const DiffKeys = {
        'LANG': {
            content: 'EN',
            attr: {
                onClick: changeLang,
                'data-next-lang': 'EN',
            },
        },
    };

    return KeyboardLayout({
        options: KeyboardLayoutOptionsFUNC,
        diffKeys: DiffKeys,
    });
};


const useKeyboardMain = () => {
    const [lang, setLang] = useState('UA');
    const [changeLang] = useState(() => getChangeLang(setLang));
    const [KeyboardLayoutFUNC] = useState(() => getKeyboardLayoutFUNC(changeLang));
    return { lang, KeyboardLayoutFUNC };
};

export default useKeyboardMain;
