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
    setKeys: ['A', 'B', 'C', 'D', 'E', 'F'],
};

export const keyboardSetNUMS: IKeyboardSet = {
    setName: 'NUMS',
    setKeys: ['0', '1', '2', '3', '4'],
};

export const keyboardSetFUNC: IKeyboardSet = {
    setName: 'FUNC',
    setKeys: ['CLEAR', 'BACKSPACE'],
};
