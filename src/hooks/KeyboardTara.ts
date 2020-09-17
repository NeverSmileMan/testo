import React, { useState } from 'react';
import { 
    KeyboardLayoutOptionsTaraNUMS,
    KeyboardLayoutOptionsTaraFUNC,
    KeyboardLayoutOptionsTARAFIX,
} from '../components/keyboard/KeyboardOptions';
import Keyboard, { IKeyboard } from '../data.structure/Keyboard';
import KeyboardLayout from '../components/keyboard/KeyboardLayout';

const changeStateTara = (keyboard: IKeyboard) => {
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

    return {
        onClick,
        KeyboardLayoutNUMS,
        KeyboardLayoutFUNC,
    };
};

const changeStateTaraFix = (keyboard: IKeyboard) => {
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

    const KeyboardLayoutTaraFIX = KeyboardLayout({
        options: KeyboardLayoutOptionsTARAFIX,
        keyClassName: 'taraFix',
    });

    return {
        onClick,
        KeyboardLayoutTaraFIX,
    };
};

export const useKeyboardTara = () => {
    const [keyboard] = useState(Keyboard.getInstance);
    const [state] = useState(() => changeStateTara(keyboard));
    return state;
}

export const useKeyboardTaraFix = () => {
    const [keyboard] = useState(Keyboard.getInstance);
    const [state] = useState(() => changeStateTaraFix(keyboard));
    return state;
}
