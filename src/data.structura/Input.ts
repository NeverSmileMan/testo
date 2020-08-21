export interface IInput {
    addSymbol: (value: string) => void;
    delSymbol: () => void;
    clearValue: () => void;
    onChange: () => void;
}

export class Input implements IInput {
    private _value: string = '';
    private _callback: (value: string) => void;

    constructor(callback: (value: string) => void) {
        this._callback = callback;
    }

    addSymbol(value: string) {
        this._value += value;
        this.onChange();
    }

    delSymbol() {
        this._value.substring(0, -1);
        this.onChange();
    }

    clearValue() {
        this._value = '';
        this.onChange();
    }

    onChange() {
        this._callback(this._value);
    }

}
