export interface IKeyboardSet {
    setName: string;
    setKeys: string[];
}

export const keyboardSetUA: IKeyboardSet = {
    setName: 'UA',
    setKeys: ['А', 'Б', 'В', 'Г', 'Д', 'Т'],
};

export const keyboardSetEN: IKeyboardSet = {
    setName: 'EN',
    setKeys: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
};

export const keyboardSetNUMS: IKeyboardSet = {
    setName: 'NUMS',
    setKeys: ['0', '1', '2', '3', '4'],
};

export const keyboardSetFUNC: IKeyboardSet = {
    setName: 'FUNC',
    setKeys: ['CLEAR', 'BACKSPACE', 'ENTER'],
};
