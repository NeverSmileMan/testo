import React, { useState } from 'react';
import Keyboard from '../data.structure/Keyboard';
import {
    KeyboardLayoutOptionsEN,
    KeyboardLayoutOptionsUA,
    KeyboardLayoutOptionsNUMS,
    KeyboardLayoutOptionsFUNC,
} from '../components/keyboard/KeyboardOptions';
import KeyboardLayout from '../components/keyboard/KeyboardLayout';

const keyboard = Keyboard.getInstance();

const KeyboardLayoutUA = KeyboardLayout({ options: KeyboardLayoutOptionsUA });
const KeyboardLayoutEN = KeyboardLayout({ options: KeyboardLayoutOptionsEN });
const KeyboardLayoutNUMS = KeyboardLayout({ options: KeyboardLayoutOptionsNUMS });

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    let keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset['key'];
    key && keyboard.onClick(key);
};

const getDiffKeys = (changeLang: React.MouseEventHandler<HTMLDivElement>) => {
    return {
        'LANG': {
            content: 'EN',
            attr: {
                onClick: changeLang,
                'data-next-lang': 'EN',
            },
        },
    };
};

const changeState = (setLang: React.Dispatch<() => string>) => {
    const changeLang = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const currentLang = target.dataset['nextLang'];
        if (!currentLang) return;
        setLang(() => currentLang);
        const nextLang = currentLang === 'UA' ? 'EN' : 'UA';
        target.innerHTML = nextLang;
        target.setAttribute('data-next-lang', nextLang);
    };

    const DiffKeys = getDiffKeys(changeLang);

    return KeyboardLayout({
        options: KeyboardLayoutOptionsFUNC,
        diffKeys: DiffKeys,
    });
}

const useKeyboardMain = () => {
    const [lang, setLang] = useState('UA');
    const [KeyboardLayoutFUNC] = useState(() => changeState(setLang));
    return {
        lang,
        KeyboardLayoutEN,
        KeyboardLayoutUA,
        KeyboardLayoutNUMS,
        KeyboardLayoutFUNC,
        onClick,
    };
};

export default useKeyboardMain;
