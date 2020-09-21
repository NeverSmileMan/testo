// import { IItem } from './Item';
import { IItem } from './items';
import IObject from './data/objects';
import { IMessage, MessageCode } from './data/Message';

export interface IStateInput<V = string> {
    isFocus: boolean;
    value: V;
    valueHTML: string;
}

export interface IInput<
    V extends string | number = string,
    S extends string | number | IItem = string>
    extends IObject<IStateInput<V>>    
{
    setFocus: () => void;
    blurFocus: () => void;
    pressKey: (key: string) => void;
    setValue: (value: string) => void;
    getValue: () => V;
    getValueHTML: () => string;
    onMessage: (message: IMessage) => void;
    onSelect: (callback: (value: S) => void) => void;
    ifFocus: () => boolean;
}

export class Input<V extends string | number = string, S extends string | number | IItem = string> implements IInput<V, S> {
    protected _value: string = '';
    protected _callbackOnChange?: (getState: () => IStateInput<V>) => void;
    protected _callbackOnSelect?: (value: S) => void;
    private _isFocus: boolean = false;
    private _message?: IMessage;

    constructor() {
        this.getStateObject = this.getStateObject.bind(this);
        this._onSelect = this._onSelect.bind(this);
    }

    getStateObject() {
        return {
            isFocus: this.ifFocus(),
            value: this.getValue() as V,
            valueHTML: `${this.getValueHTML()}`,
        };
    }

    onChange(callback: (getState: () => IStateInput<V>) => void) {
        this._callbackOnChange = callback;
    }

    setFocus() {
        this._isFocus = true;
        this._onChange();
    }

    blurFocus() {
        this._isFocus = false;
        this._onChange();
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
            this._throwMessage(MessageCode.INTERNAL_ERROR, 'НЕДОПУСТИМИЙ СИМВОЛ!');
        }
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

    getValue() {
        return this._value as V;
    }

    getValueHTML() {
        return (' ' + this.getValue()).replace(/ /g, '&nbsp;');
    }

    onMessage(message: IMessage) {
        this._message = message;
    }

    onSelect(callback: (value: S) => void) {
        console.log('NEW CALLBACKS');
        this._callbackOnSelect = callback;
    }

    ifFocus() {
        return this._isFocus;
    }

    protected _throwMessage(code: MessageCode, text?: string) {
        this._message?.sendMessage(code);
    }

    protected _onChange() {
        if (this._callbackOnChange)
            this._callbackOnChange(this.getStateObject);
    }

    protected _onSelect(value?: any) {
        if (this._callbackOnSelect)
            this._callbackOnSelect(value || this.getValue());
    }

}

