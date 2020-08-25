export interface IKeyboard {
    getLanguage: () => Languages;
    setLanguage: (value: Languages) => void;
}

export enum Languages {
    UA,
    RU,
    EN,
}

export class Keyboard implements IKeyboard {

    private _language: Languages = Languages.UA;
    private _callback: (keyCode: number, language: Languages) => void;

    constructor(callback: (...args: any[]) => void) {
        this._callback = callback;
    }

    getLanguage() {
        return this._language;
    }

    setLanguage(value: Languages) {
        this._language = value;
    }

    onClick(keyCode: number) {
        this._callback(keyCode, this.getLanguage());
    }

}
