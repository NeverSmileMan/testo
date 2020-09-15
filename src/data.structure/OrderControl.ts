import { IItem, IItemAmount, ItemAmount } from './Item';
import Weights, { IWeightsTest } from './Weights';
import { IOrder } from './Order';
import Message, { IMessage } from './Message';
import { MessageCode } from './data/messagesInfo';
import { State, Mode } from './types/types';

export interface IOrderControl {
    getCurrentOrder: () => IOrder | null;
    getOrderNumber: () => number | null;
    delItem: () => void;
    getItems: () => IItemAmount[];
    selectItem: (index: number | null) => void;
    isSelected: () => boolean;
    getSelectedItemIndex: () => number | null;    
    getItemsCount: () => number | 0;
    getTotal: () => number;
    onChangeOrder: (callback: () => void) => void;
    getState: () => State;
    addItem: (item: IItem) => void;
    clearInput: (callback: () => void) => void;
    getStateOrder: () => IStateOrder;
}

export interface IStateOrder {
    order: IOrder | null;
    isSelected: boolean;
    total: string;
    orderItems: IItemAmount[];
    selectedItemIndex: number | null;
    orderMode: Mode | null;
    clearInput: (callback: () => void) => void;
    getStateOrder: () => IStateOrder;
}

export class OrderControl implements IOrderControl {
    private _weights: IWeightsTest;
    private _message: IMessage;
    private _selectedItemIndex: number | null = null;
    protected _currentOrder: IOrder | null = null;
    private _state: State = State.ENABLED;
    private _callbackOnChangeOrder?: () => void;
    private _callbackOnClearInput?: () => void;

    constructor() {
        this._message = Message.getInstance();
        this._weights = Weights.getInstance();
        this._weights.onChange(this._onWeightsChange.bind(this));
        this.getStateOrder = this.getStateOrder.bind(this);
    }

    clearInput(callback: () => void) {
        this._callbackOnClearInput = callback;
    }

    getCurrentOrder() {
        return this._currentOrder;
    }
    
    _clearInput() {
        if (this._callbackOnClearInput) this._callbackOnClearInput();
    }

    getStateOrder(): IStateOrder {
        return {
            order: this.getCurrentOrder(),
            isSelected: this.isSelected(),
            total: this.getTotal().toFixed(2),
            orderItems: this.getItems(),
            selectedItemIndex: this.getSelectedItemIndex(),
            orderMode: this.getState() === State.PENDING ? Mode.MODAL : null,
            clearInput: this.clearInput.bind(this),
            // onWeightsChange: this.onWeightsChange.bind(this),
            getStateOrder: this.getStateOrder,
        };
    }

    setOrder(order: IOrder) {
        if (this._currentOrder) this._currentOrder.tara = this._weights.getTara();
        this._currentOrder = order;
        this._weights?.setTara(this._currentOrder.tara);
        this.selectItem(null);
        this._onWeightsChange();
    }

    selectItem(index: number | null) {
        if (this._selectedItemIndex !== index) {
            this._selectedItemIndex = index;
        }
        else this._selectedItemIndex = null;
        this._onChangeOrder();
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
        this._clearInput();
        this._state = State.PENDING;
        this._onChangeOrder();
    }

    private _throwMessage(code: MessageCode | null) {
        this._message.sendMessage(code);
        if (code === MessageCode.WEIGHTS_IS_EMPTY) {
            setTimeout(() => this._onWeightsChange(), 1000);
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

    getMessage() {
        return this._message;
    }

    private _setTotal(value: number) {
        this._currentOrder!.total += value;
    }

    getOrderNumber() {
        return this._currentOrder ? this._currentOrder.orderNumber : null;
    }

    onChangeOrder(callback: () => void) {
        this._callbackOnChangeOrder = callback;
    }

    protected _onChangeOrder() {
        if (this._callbackOnChangeOrder) this._callbackOnChangeOrder();
    }

    private _onWeightsChange() {
        if (this._state === State.PENDING) {
            if (this._weights && this._weights.getWeight() <= 0) {
                this._state = State.ENABLED;
                this._onChangeOrder();
                this._weights.setPrice(null);
            }
            return;
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
