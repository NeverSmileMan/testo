interface IKeyboardSets {
    [key: string]: IKeyboardSet;
}

interface IKeyboardSet {
    setName: string;
    setKeys: string[];
}

const keyboardSetUA: IKeyboardSet = {
    setName: 'UA',
    setKeys: ['А', 'Б', 'В', 'Г', 'Д'],
};

const keyboardSetEN: IKeyboardSet = {
    setName: 'EN',
    setKeys: ['A', 'B', 'C', 'D', 'E', 'F'],
};

const keyboardSetNUMS: IKeyboardSet = {
    setName: 'NUMS',
    setKeys: ['0', '1', '2', '3', '4'],
};

const KeyboardSets: IKeyboardSets = {
    keyboardSetUA,
    keyboardSetEN,
    keyboardSetNUMS,
}

export default KeyboardSets;
