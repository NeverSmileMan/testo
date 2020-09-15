import { IInput } from './Input';

export interface IKeyboard {
    setActiveInput: (input: IInput | null) => void;
}

class Keyboard implements IKeyboard {
    private _input?: IInput | null;

    onClick(key: string) {
        this._input?.pressKey(key);
    }

    setActiveInput(input: IInput | null) {
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
