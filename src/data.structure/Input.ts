import { IItem } from './Item';

export interface IInput {
    pressKey: (key: string) => void;
    clearValue: () => void;
    getValue: () => string | number;
    setFocus: () => void;
    blurFocus: () => void;
    onChange: (callback: (value: string) => void) => void;
    onSelect: (callback: (value: any) => void) => void;
    onFocusChange: (callback: () => void) => void;
}

export interface IInputNumber extends IInput {
    getValue: () => number;
    onSelect: (callback: (value: number) => void) => void;
}

export interface IInputList extends IInput {
    getValue: () => string;
    onSelect: (callback: (item: IItem) => void) => void;
}

export class Input implements IInput {
    protected _value: string = '';
    private _callbackOnFocusChange?: () => void;
    protected _callbackOnChange?: (value: string) => void;
    protected _callbackOnSelect?: (value: any) => void;

    protected _addSymbol(value: string) {
        this._value += value;
        this._onChange();
    }

    protected _delSymbol() {
        this._value = this._value.substring(0, this._value.length - 1);
        this._onChange();
    }

    clearValue() {
        this._value = '';
        this._onChange();
    }

    getValue() {
        return this._value as any;
    }

    setFocus() {
        this._onFocusChange();
    }

    blurFocus() {
        this._onFocusChange();
    }

    onFocusChange(callback: () => void) {
        return this._callbackOnFocusChange = callback;
    }

    private _onFocusChange() {
        if (this._callbackOnFocusChange) this._callbackOnFocusChange();
    }

    protected _onChange() {
        if (this._callbackOnChange) this._callbackOnChange(this._value);
    }

    protected _onSelect(value?: any) {
        if (this._callbackOnSelect) this._callbackOnSelect(this._value);
    }

    onChange(callback: (value: string) => void) {
        this._callbackOnChange = callback;
    }

    onSelect(callback: (value: any) => void) {
        this._callbackOnSelect = callback;
    }

    pressKey(key: string) {
        const currentValue = this._value;
        try {
            switch(key) {
                case "SPACE":
                    this._addSymbol(' ');
                    break;
                case "BACKSPACE":
                    this._delSymbol();
                    break;
                case "CLEAR":
                    this.clearValue();
                    break;
                case "ENTER":
                    this._onSelect();
                    break;             
                default:
                    this._addSymbol(key);
            }
        } catch(e) {
            this._value = currentValue;
            //throw e;
        }
    }
}

export class InputList extends Input implements IInputList {

    _onSelect(item: IItem) {
        if (!item) return;
        if (this._callbackOnSelect) this._callbackOnSelect(item);
    }

    getValue() {
        return this._value;
    }
}

export class InputNumber extends Input implements IInputNumber {

    protected _onChange() {
        if (!this._value || String(this.getValue()) === this._value) {
            super._onChange();
            return;
        }
        else throw new Error('Недопустимий символ');
    }

    protected _onSelect() {
        if (this._callbackOnSelect) this._callbackOnSelect(this.getValue());
    }

    onSelect(callback: (value: number) => void) {
        this._callbackOnSelect = callback;
    }

    getValue() {
        return Number(this._value);
    }
}

let inputList: InputList;
let inputNumber: InputNumber;

function getInputListInstance() {
    if (!inputList) {
        inputList = new InputList();
    }
    return inputList;
}

function getInputNumberInstance() {
    if (!inputNumber) {
        inputNumber = new InputNumber();
    }
    return inputNumber;
}

export default { getInputListInstance, getInputNumberInstance };
