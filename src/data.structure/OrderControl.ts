import { IItem, IItemAmount, ItemAmount } from './Item';
import Weights, { IWeightsTest } from './Weights';
import { IOrder } from './Order';
import { MessageCode } from './data/messagesInfo';
import { State, Mode } from './types/types';
import Message from './Message';
import IObject from './types/objects';

export interface IOrderControl extends IObject<IStateOrder> {
    getOrder: () => IOrder;
    getOrderNumber: () => number;
    delItem: () => void;
    getItems: () => IItemAmount[];
    selectItem: (index: number | null) => void;
    isSelected: () => boolean;
    getSelectedItemIndex: () => number | null; 
    getItemsCount: () => number | 0;
    getTotal: () => number;
    getState: () => State;
    addItem: (item: IItem) => void;
    onReset: (callback: () => void) => void;
    onMessage: (callback: (code: MessageCode | null) => void) => void;
    onItemsChange: (callback: () => void) => void;
    onWeightsChange: () => void;
    setOrder: () => void;
}

export interface IStateOrder {
    order: IOrder;
    isSelected: boolean;
    total: string;
    orderItems: IItemAmount[];
    selectedItemIndex: number | null;
    orderMode: Mode;
}

export class OrderControl implements IOrderControl {
    private _weights: IWeightsTest = Weights.getInstance();
    private _selectedItemIndex: number | null = null;
    private _currentOrder: IOrder;
    private _state: State = State.ENABLED;
    private _callbackOnChange?: (getState: () => IStateOrder) => void;
    private _callbackOnReset?: () => void;
    private _callbackOnMessage?: (code: MessageCode | null) => void;
    private _callbackOnItemsChange?: () => void;

    constructor(order: IOrder) {
        this._currentOrder = order;
        this.onWeightsChange = this.onWeightsChange.bind(this);
        this.getStateObject = this.getStateObject.bind(this);
        this.onMessage(Message.getInstance().sendMessage); //???
        // this._onWeightsChange();
    }

    onItemsChange(callback: () => void) {
        this._callbackOnItemsChange = callback;
    }

    private _onItemsChange() {
        if (this._callbackOnItemsChange) this._callbackOnItemsChange();
    }

    setOrder() {
        this._weights?.setTara(this._currentOrder.tara);
        this.selectItem(null);
        this.onWeightsChange();
    }

    onMessage(callback: (code: MessageCode | null) => void) { //null ???????
        this._callbackOnMessage = callback;
    }

    onReset(callback: () => void) {
        this._callbackOnReset = callback;
    }

    getCurrentOrder() {
        return this._currentOrder;
    }
    
    _onReset() {
        if (this._callbackOnReset) this._callbackOnReset();
    }

    getStateObject(): IStateOrder {
        return {
            order: this.getOrder(),
            isSelected: this.isSelected(),
            total: this.getTotal().toFixed(2),
            orderItems: this.getItems(),
            selectedItemIndex: this.getSelectedItemIndex(),
            orderMode: this.getState() === State.PENDING ? Mode.MODAL : Mode.NORMAL,
        };
    }

    getOrder() {
        return this._currentOrder;
    }

    selectItem(index: number | null) {
        if (this._selectedItemIndex !== index) {
            this._selectedItemIndex = index;
        }
        else this._selectedItemIndex = null;
        this._onChange();
    }

    isSelected() {
        return (!(this._selectedItemIndex === null) && true) || false;
    }

    getSelectedItemIndex() {
        return this._selectedItemIndex;
    }

    addItem(item: IItem) {
        if (!this._weights.isStable()) {
            this._throwMessage(MessageCode.WEIGHTS_NOT_STABLE);
            return;
        }

        if (this._weights.getWeight() <= 0.040) {
            this._throwMessage(MessageCode.WEIGHTS_IS_EMPTY);
            return;
        }

        this._weights.setPrice(item.price, item.name);
        const newItem: IItemAmount = new ItemAmount(item, this._weights?.getSum());
        this._currentOrder!.items.push(newItem);
        this._setTotal(newItem.sum);
        this.selectItem(null);
        this._onReset();
        this._state = State.PENDING;

        this._onChange();
        this.getItemsCount() > 0 && this._onItemsChange();
    }

    private _throwMessage(code: MessageCode | null) {
        if (this._callbackOnMessage) { 
            this._callbackOnMessage(code);
        }
    }

    delItem() {
        if (!this.isSelected()) return;
        this._setTotal(-this._currentOrder!.items[this._selectedItemIndex!].sum);
        this._currentOrder!.items.splice(this._selectedItemIndex!, 1);
        this.selectItem(null);
    }

    getItems() {
        return this._currentOrder ? this._currentOrder.items : [];
    }

    getItemsCount() {
        return this._currentOrder ? this._currentOrder.items.length : 0;
    }

    getTotal(): number {
        return this._currentOrder ? this._currentOrder.total : 0;
    }

    private _setTotal(value: number) {
        this._currentOrder!.total += value;
    }

    getOrderNumber() {
        return this._currentOrder.orderNumber;
    }

    onChange(callback: (getState: () => IStateOrder) => void) {
        this._callbackOnChange = callback;
    }

    protected _onChange() {
        if (this._callbackOnChange) this._callbackOnChange(this.getStateObject);
    }

    onWeightsChange() {
        if (this._state === State.PENDING) {
            console.log(this._weights.getWeight());
            if (this._weights && this._weights.getWeight() <= 0.01) {
                this._state = State.ENABLED;
                this._onChange();
                this._weights.setPrice(null);
            }
            return;
        } else {
            this._currentOrder.tara = this._weights.getTara();
        }

        if (!this._weights.isStable()) {
            this._throwMessage(MessageCode.WEIGHTS_NOT_STABLE);
            return;
        }

        if (this._weights.getWeight() <= 0.040) {
            this._throwMessage(MessageCode.WEIGHTS_IS_SMALL);
            return;
        }

        this._throwMessage(null);
    }

    getState() {
        return this._state;
    }
}

export default OrderControl;
