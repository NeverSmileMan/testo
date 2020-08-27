import { IInput } from './Input';

export interface IKeyboard {
    getLanguage: () => Languages;
    setLanguage: (value: Languages) => void;
    setActiveInput: (input: IInput | null) => void;
}

export enum Languages {
    UA,
    RU,
    EN,
}

export class Keyboard implements IKeyboard {

    private _language: Languages = Languages.UA;
    private _input?: IInput | null;

    getLanguage() {
        return this._language;
    }

    setLanguage(value: Languages) {
        this._language = value;
    }

    onClick(key: string) {
        if (this._input) this._input.pressKey(key);
    }

    setActiveInput(input: IInput | null) {
        this._input = input;
    }
}
