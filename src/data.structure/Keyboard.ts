import { IInputBase } from './Input';

export interface IKeyboard {
    onClick: (key: string) => void
    setActiveInput: (input: IInputBase | null) => void;
}

class Keyboard implements IKeyboard {
    private _input?: IInputBase | null;

    onClick(key: string) {
        if (key.match(/^([ |A-Z|А-Я|0-9|І|Ї|Є|Ё]|CLEAR|BACKSPACE|ENTER)$/))
            this._input?.pressKey(key);
    }

    setActiveInput(input: IInputBase | null) {
        this._input = input;
    }
}

let instance: Keyboard;

function getInstance() {
    if (!instance) {
        instance = new Keyboard();
    }
    return instance;
}

export default { getInstance };
