import { IItem } from './Item';

export interface IInputBase {
    setFocus: () => void;
    blurFocus: () => void;
    pressKey: (key: string) => void;
}

export interface IInput<V extends string | number, S extends string | number | IItem>
    extends IInputBase
{
    setValue: (value: string) => void;
    getValue: () => string | number;
    getValueHTML: () => string;
    onChange: (callback: (getState: () => IStateInput<V>) => void) => void;
    onSelect: (callback: (value: S) => void) => void;
    ifFocus: () => boolean;
    getStateObject: () => IStateInput<V>;
}

export interface IInputList extends IInput<string, IItem> {
    _onSelect: (item: IItem) => void;
}

export interface IInputNumber extends IInput<number, number> {
    getValue: () => number;
}

export interface IStateInput<V> {
    isFocus: boolean;
    value: V;
    valueHTML: string;
}

export class Input<V extends string | number, S extends string | number | IItem> implements IInput<V, S> {
    protected _value: string = '';
    protected _callbackOnChange?: (getState: () => IStateInput<V>) => void;
    protected _callbackOnSelect?: (value: S) => void;
    private _isFocus: boolean = false;

    constructor() {
        this.getStateObject = this.getStateObject.bind(this);
        this._onSelect = this._onSelect.bind(this);
    }

    getStateObject() {
        return {
            isFocus: this.ifFocus(),
            value: this.getValue(),
            valueHTML: `${this.getValue()}`,
        };
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
        return this._value as V;
    }

    getValueHTML() {
        return `&{this.getValue()}`;
    }

    setFocus() {
        this._isFocus = true;
        this._onChange();
    }

    blurFocus() {
        this._isFocus = false;
        this._onChange();
    }

    protected _onChange() {
        if (this._callbackOnChange) this._callbackOnChange(this.getStateObject);
    }

    protected _onSelect(value?: any) {
        if (this._callbackOnSelect) this._callbackOnSelect(value || this.getValue());
    }

    onChange(callback: (getState: () => IStateInput<V>) => void) {
        this._callbackOnChange = callback;
    }

    onSelect(callback: (value: S) => void) {
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

export class InputList extends Input<string, IItem> implements IInputList {

    _onSelect(item: IItem) {
        if (!item) return;
        if (this._callbackOnSelect) this._callbackOnSelect(item);
    }

    getValueHTML() {
        return (' ' + this.getValue()).replace(/ /g, '&nbsp;');
    }
}

export class InputNumber extends Input<number, number> implements IInputNumber {

    getValue() {
        return Number(this._value);
    }

    getValueHTML() {
        return (this.getValue() / 1000).toFixed(3);
    }

    protected _onChange() {
        if (!this._value || String(this.getValue()) === this._value) {
            super._onChange();
            return;
        }
        else throw new Error('Недопустимий символ');
    }
}
