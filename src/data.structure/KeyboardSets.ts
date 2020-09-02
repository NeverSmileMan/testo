interface IKeyboardSets {
    [key: string]: IKeyboardSet;
}

interface IKeyboardSet {
    setName: string;
    setKeys: string[];
}

const keyboardSetUA: IKeyboardSet = {
    setName: 'UA',
    setKeys: ['А', 'Б', 'В', 'Г', 'Д', 'Т'],
};

const keyboardSetEN: IKeyboardSet = {
    setName: 'EN',
    setKeys: ['A', 'B', 'C', 'D', 'E', 'F'],
};

const keyboardSetNUMS: IKeyboardSet = {
    setName: 'NUMS',
    setKeys: ['0', '1', '2', '3', '4'],
};

const keyboardSetFUNC: IKeyboardSet = {
    setName: 'FUNC',
    setKeys: ['CLEAR', 'BACKSPACE'],
};

const KeyboardSets: IKeyboardSets = {
    keyboardSetUA,
    keyboardSetEN,
    keyboardSetNUMS,
    keyboardSetFUNC,
}

export default KeyboardSets;
