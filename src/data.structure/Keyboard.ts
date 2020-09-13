import { IInput } from './Input';

export interface IKeyboard {
    // addSet: (setName: string, set: string[]) => void;
    // delSet: (setName: string) => void;
    // getSet: (setName: string) => string[] | undefined;
    // getSymbol: (setName: string, index: number) => string | undefined;
    setActiveInput: (input: IInput | null) => void;
}

class Keyboard implements IKeyboard {
    private _input?: IInput | null;
    // private _sets: Map<string, string[]> = new Map();

    // addSet(setName: string, set: string[]) {
    //     this._sets.set(setName, set);
    // }

    // delSet(setName: string) {
    //     this._sets.delete(setName);
    // }

    // getSet(setName: string) {
    //     return this._sets.get(setName);
    // }

    // getSymbol(setName: string, index: number) {
    //     return this._sets.get(setName)?.[index];
    // }

    onClick(key: string) {
        this._input?.pressKey(key);
    }

    setActiveInput(input: IInput | null) {
        this._input = input;
    }
}

let instance: Keyboard;

export function getInstance() {
    if (!instance) {
        instance = new Keyboard();
    }
    return instance;
}

export default { getInstance };
