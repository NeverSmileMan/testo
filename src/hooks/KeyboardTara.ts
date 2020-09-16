import React from 'react';
import { 
    KeyboardLayoutOptionsTaraNUMS,
    KeyboardLayoutOptionsTaraFUNC,
    KeyboardLayoutOptionsTARAFIX,
} from '../components/keyboard/KeyboardOptions';
import Keyboard from '../data.structure/Keyboard';
import KeyboardLayout from '../components/keyboard/KeyboardLayout';

const keyboard = Keyboard.getInstance();

export const onClickTara = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset['key'];
    key && keyboard.onClick(key);
};

export const KeyboardLayoutNUMS = KeyboardLayout({
    options: KeyboardLayoutOptionsTaraNUMS,
    keyClassName: 'taraNums',
});

export const KeyboardLayoutFUNC = KeyboardLayout({
    options: KeyboardLayoutOptionsTaraFUNC,
    keyClassName: 'taraFunc',
});

export const onClickTaraFix = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset['key'];
    if (key) {
        keyboard.onClick('CLEAR');
        keyboard.onClick(key);
        keyboard.onClick('ENTER');
    }
};

export const KeyboardLayoutTaraFIX = KeyboardLayout({
    options: KeyboardLayoutOptionsTARAFIX,
    keyClassName: 'taraFix',
});
