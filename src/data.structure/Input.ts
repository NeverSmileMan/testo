import { IItem } from './Item';

export interface IInput {
    pressKey: (key: string) => void;
    setValue: (value: string) => void;
    getValue: () => string | number;
    getValueHTML: () => string;
    setFocus: () => void;
    blurFocus: () => void;
    onChange: (callback: (value: string) => void) => void;
    onSelect: (callback: (value: any) => void) => void;
    onFocusChange: (callback: () => void) => void;
    ifFocus: () => boolean;
    getStateInput: () => {};
}

export interface IInputNumber extends IInput {
    getValue: () => number;
    onSelect: (callback: (value: number) => void) => void;
}

export interface IStateInput {
    isFocus: boolean;
    value: string;
    valueHTML: string;
}

export interface IInputList extends IInput {
    getValue: () => string;
    onSelect: (callback: (item: IItem) => void) => void;
    _onSelect: (item: IItem) => void;
    getStateInput: () => IStateInput;
}

export class Input implements IInput {
    protected _value: string = '';
    private _callbackOnFocusChange?: () => void;
    protected _callbackOnChange?: (value: string) => void;
    protected _callbackOnSelect?: (value: any) => void;
    private _isFocus: boolean = false;

    constructor() {
        this.getStateInput = this.getStateInput.bind(this);
    }

    getStateInput() {
        return {};
        // return {
        //     isFocus: this.ifFocus(),
        //     value: this.getValue(),
        //     valueHTML: this.getValueHTML(),
        // };
    }

    protected _addSymbol(value: string) {
        this._value += value;
        this._onChange();
    }

    protected _delSymbol() {
        this._value = this._value.substring(0, this._value.length - 1);
        this._onChange();
    }

    setValue(value: string = '') {
        this._value = value;
        this._onChange();
    }

    ifFocus() {
        return this._isFocus;
    }

    getValue() {
        return this._value as string | number;
    }

    getValueHTML() {
        return (' ' + this.getValue()).replace(/ /g, '&nbsp;');
    }

    setFocus() {
        this._isFocus = true;
        // this._onChange();
        this._onFocusChange();
    }

    blurFocus() {
        this._isFocus = false;
        // this._onChange();
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
                    this.setValue('');
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

    getStateInput() {
        return {
            isFocus: this.ifFocus(),
            value: this.getValue(),
            valueHTML: this.getValueHTML(),
        };
    }

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

// let inputList: InputList;
let inputNumber: InputNumber;

// function getInputListInstance() {
//     if (!inputList) {
//         inputList = new InputList();
//     }
//     return inputList;
// }

function getInputNumberInstance() {
    if (!inputNumber) {
        inputNumber = new InputNumber();
    }
    return inputNumber;
}

export default { getInputNumberInstance };
