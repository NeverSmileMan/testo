import { IList, List } from "./List";
import { IGood } from './Good';

export interface IInput {
    pressKey: (key: string) => void;
    clearValue: () => void;
    setCallbackOnSelect: (callback: (item: IGood) => void) => void;
}

export class Input implements IInput {
    private _value: string = '';
    private _list: IList;

    constructor() {
        this._list = new List();
    }
    
    private _addSymbol(value: string) {
        this._value += value;
        this._onChange();
    }

    private _delSymbol() {
        this._value.substring(0, -1);
        this._onChange();
    }

    clearValue() {
        this._value = '';
        this._onChange();
    }

    private _onChange() {
        this._list.setFilter(this._value);
    }

    setCallbackOnSelect(callback: (item: IGood) => void) {
        this._list.setCallbackOnSelect(callback);
    }

    pressKey(key: string) {
        switch(key) {
            case "BACKSPACE":
                this._delSymbol();
                break;
            case "CLEAR":
                this.clearValue();
                break;
            default:
                this._addSymbol(key);
        }
    }
}
