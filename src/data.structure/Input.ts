import { IList, List } from "./List";
import { IItem } from './Item';
import ActiveInputService, { IActiveInputService } from "./ActiveInputService";

export interface IInput {
    pressKey: (key: string) => void;
    clearValue: () => void;
    getValue: () => string | number;
    setFocus: () => void;
    delFocus: () => void;
    onChange: (callback: (value: string) => void) => void;
    setCallbackOnSelect: (callback: (value: any) => void) => void;
}

export interface IInputOptions {
    tabIndex?: number;
}

export interface IInputNumber extends IInput {
    getValue: () => number;
    setCallbackOnSelect: (callback: (value: number) => void) => void;
}

export interface IInputList extends IInput {
    getValue: () => string;
    getListInstance: () => IList;
    setCallbackOnSelect: (callback: (item: IItem) => void) => void;
}

export class Input implements IInput {
    private _keyboard: IActiveInputService;
    protected _value: string = '';
    protected _callbackOnChange?: (value: string) => void;
    protected _callbackOnSelect?: (value: any) => void;
    
    constructor(options?: IInputOptions) {
        this._keyboard = ActiveInputService.getInstance();
        if (options?.tabIndex === 0) this._keyboard.setActiveInput(this);
    }

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
        this._keyboard.setActiveInput(this);
    }

    delFocus() {
        this._keyboard.delActiveInput(this);
    }

    protected _onChange() {
        if (this._callbackOnChange) {
            this._callbackOnChange(this._value);
        }
    }

    protected _onSelect(value?: any) {
        if (this._callbackOnSelect) this._callbackOnSelect(this._value);
    }

    onChange(callback: (value: string) => void) {
        this._callbackOnChange = callback;
    }

    setCallbackOnSelect(callback: (value: any) => void) {
        this._callbackOnSelect = callback;
    }

    pressKey(key: string) {
        const currentValue = this._value;
        try {
            switch(key) {
                case "BACKSPACE":
                    console.log('BACKSPACE');
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
    private _list: IList;

    constructor(options?: IInputOptions) {
        super(options);
        this._list = new List();
        this._list.onSelect(this._onSelect.bind(this));
    }

    protected _onChange() {
        this._list.setFilter(this._value);
        super._onChange(); 
    }

    protected _onSelect(item: IItem){
        if (this._callbackOnSelect) this._callbackOnSelect(item);
    }

    getValue() {
        return this._value;
    }

    getListInstance() {
        return this._list;
    }
}

export class InputNumber extends Input implements IInputNumber {

    constructor(options?: IInputOptions) {
        super(options);
    }

    protected _onChange() {
        if (String(this.getValue()) === this._value)
            super._onChange();
        else throw new Error('Недопустимий символ');
    }

    protected _onSelect() {
        if (this._callbackOnSelect) this._callbackOnSelect(this.getValue());
    }

    setCallbackOnSelect(callback: (value: number) => void) {
        this._callbackOnSelect = callback;
    }

    getValue() {
        return Number(this._value);
    }
}

let instance: InputList;

export function getInstance(options?: IInputOptions) {
    if (!instance) {
        console.log("NEW INPUT");
        instance = new InputList(options);
    }
    return instance;
}

export default { getInstance };
