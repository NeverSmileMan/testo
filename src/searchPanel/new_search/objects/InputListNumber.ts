import { Input, IInput } from './Input';
// import { IItem } from './Item';
import { IItem } from './items';
import { MessageCode } from './data/Message';

export interface IInputList extends IInput<string, IItem> {
    _onSelect: (item: IItem) => void;
}

export interface IInputNumber extends IInput<number, number> {
    getValue: () => number;
}

export class InputList extends Input<string, IItem> implements IInputList {

    _onSelect(item: IItem) {
        if (!item) return;
        if (this._callbackOnSelect) this._callbackOnSelect(item);
    }
}

export class InputNumber extends Input<number, number> implements IInputNumber {

    getStateObject() {
        return {
            isFocus: this.ifFocus(),
            value: this.getValue(),
            valueHTML: `${this.getValueHTML()}`,
        };
    }

    getValue() {
        return Number(this._value) / 1000;
    }

    getValueHTML() {
        return (this.getValue()).toFixed(3);
    }

    protected _onChange() {
        if (!this._value || String(this.getValue() * 1000) === this._value) {
            super._onChange();
            return;
        }
        else {
            this._throwMessage(MessageCode.INTERNAL_ERROR, 'НЕДОПУСТИМЕ ЗНАЧЕННЯ!');
        }
    }
}

export * from './Input';
