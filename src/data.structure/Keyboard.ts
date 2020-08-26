import { IInput } from './Input';

export interface IKeyboard {
    getLanguage: () => Languages;
    setLanguage: (value: Languages) => void;
    setActiveInput: (input: IInput) => void;
}

export enum Languages {
    UA,
    RU,
    EN,
}

export class Keyboard implements IKeyboard {

    private _language: Languages = Languages.UA;
    private _input?: IInput;

    getLanguage() {
        return this._language;
    }

    setLanguage(value: Languages) {
        this._language = value;
    }

    onClick(key: string) {
        if (!this._input) return;
        switch(key) {
            case "BACKSPACE":
                this._input.delSymbol();
                break;
            case "CLEAR":
                this._input.clearValue();
                break;
            default:
                this._input.addSymbol(key);
        }
    }

    setActiveInput(input: IInput) {
        this._input = input;
    }
}
