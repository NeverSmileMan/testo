import React, {} from 'react';
import { keyboardSetEN, keyboardSetUA, keyboardSetNUMS, keyboardSetFUNC, keyboardSetTARAFIX } from '../data.structure/data/keyboardSets';
import { IKeyboardOptions } from '../functions/keyboardFunc';

export const KeyboardLayoutOptionsEN: IKeyboardOptions = {
    keyboardSet: keyboardSetEN.setKeys,
    keyCountByRow: [9, 10, 8],
    k1: 0.4, k2: 0.4, k3: 0.7,
    differentKeys: {
        'SPACE': {
            width: 2,
            content: ' ',
        },
    },
};

export const KeyboardLayoutOptionsUA: IKeyboardOptions = {
    keyboardSet: keyboardSetUA.setKeys,
    keyCountByRow: [12, 12, 10],
    k1: 0.4, k2: 0.4, k3: 0.7,
    differentKeys: {
        'SPACE': {
            width: 3,
            content: ' ',
        },
    },
};

export const KeyboardLayoutOptionsNUMS: IKeyboardOptions = {
    keyboardSet: keyboardSetNUMS.setKeys,
    keyCountByRow: [3, 3, 3, 1],
    k1: 0.4, k2: 0.4, k3: 0.8,
    differentKeys: {
        '0': {
            width: 3,
        }, 
    },
};

const keyboardSet = keyboardSetFUNC.setKeys;
keyboardSet.splice(2, 1);
keyboardSet.push('LANG');

export const KeyboardLayoutOptionsFUNC: IKeyboardOptions = {
    keyboardSet: keyboardSetFUNC.setKeys,
    keyCountByRow: [1, 1, 1],
    k1: 0.4,k2: 0.4,k3: 0.9,
    differentKeys: {
        'CLEAR': {
            content: 'DEL',
        },
        'BACKSPACE': {
            content: <span>&#8592;</span>,
        }, 
        'LANG': {
            content: 'EN',
        },
    },
};

export const KeyboardLayoutOptionsTARAFIX: IKeyboardOptions = {
    keyboardSet: keyboardSetTARAFIX.setKeys,
    keyCountByRow: [3, 3, 3],
    k1: 0.3, k2: 0.3, k3: 0.9,
    differentKeys: keyboardSetTARAFIX.setKeys.reduce(
        (r, key) => Object.assign(r, ({ [key]: { content: key + ' гр' } })), {}
    ),
};

console.log(KeyboardLayoutOptionsTARAFIX);
