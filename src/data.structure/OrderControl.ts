import { IItem, IItemAmount, ItemAmount } from './Item';
import { IWeightsTest } from './Weights';
import { IOrder } from './Order';
import { MessageCode } from './data/messagesInfo';
import { State, Mode } from './types/types';
import IObject from './types/objects';
import { IMessage } from './Message';

export interface IOrderControl extends IObject<IStateOrder> {
    setOrder: (order: IOrder) => void;
    setWeights: (weights: IWeightsTest) => void;
    initOrder: () => void;
    addItem: (item: IItem) => void;
    delItem: () => void;
    getItems: () => IItemAmount[];
    getItemsCount: () => number | 0;
    getOrderNumber: () => number | null;
    getOrder: () => IOrder | null;
    getTotal: () => number;
    selectItem: (index: number | null) => void;
    isSelected: () => boolean;
    getSelectedItemIndex: () => number | null; 
    getState: () => State;
    onReset: (callback: () => void) => void;
    onMessage: (message: IMessage) => void;
    onItemsChange: (callback: () => void) => void;
}

export interface IStateOrder {
    order: IOrder | null;
    isSelected: boolean;
    total: string;
    orderItems: IItemAmount[];
    selectedItemIndex: number | null;
    orderMode: Mode;
}

export class OrderControl implements IOrderControl {
    private _weights?: IWeightsTest;
    private _message?: IMessage;
    private _selectedItemIndex: number | null = null;
    private _order?: IOrder;
    private _state: State = State.READY;
    private _callbackOnChange?: (getState: () => IStateOrder) => void;
    private _callbackOnReset?: () => void;
    private _callbackOnMessage?: (code: MessageCode) => void;
    private _callbackOnItemsChange?: () => void;

    constructor() {
        this._onWeightsChange = this._onWeightsChange.bind(this);
        this.getStateObject = this.getStateObject.bind(this);
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

    onChange(callback: (getState: () => IStateOrder) => void) {
        this._callbackOnChange = callback;
    }

    setOrder(order: IOrder) {
        this._order = order;
        this.selectItem(null);
        this._onChange(); 
        this._onItemsChange();  
    }

    setWeights(weights: IWeightsTest) {
        this._weights = weights;
        this._weights.onChange(this._onWeightsChange);
    }

    initOrder() {
        if (!this._order) return;
        this._weights?.setTara(this._order.tara);
    }

    addItem(item: IItem) {
        if (!this._weights?.isStable()) {
            this._throwMessage(MessageCode.WEIGHTS_NOT_STABLE);
            return;
        }

        if (this._weights.getWeight() <= 0.040) {
            this._throwMessage(MessageCode.WEIGHTS_IS_EMPTY);
            return;
        }

        this._weights.setPrice(item.price, item.name);
        const newItem: IItemAmount = new ItemAmount(item, this._weights?.getSum());
        this._order!.items.push(newItem);
        this._setTotal(newItem.sum);
        this.selectItem(null);
        this._onReset();
        this._state = State.PENDING;
        this._onChange();
        this.getItemsCount() > 0 && this._onItemsChange();
    }

    delItem() {
        if (!this.isSelected()) return;
        this._setTotal(-this._order!.items[this._selectedItemIndex!].sum);
        this._order!.items.splice(this._selectedItemIndex!, 1);
        this.selectItem(null);
    }

    getItems() {
        return this._order ? this._order.items : [];
    }

    getItemsCount() {
        return this._order ? this._order.items.length : 0;
    }

    getOrder() {
        return this._order || null;
    }

    getOrderNumber() {
        return this._order?.orderNumber || null;
    }

    getTotal(): number {
        return this._order ? this._order.total : 0;
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

    getState() {
        return this._state;
    }

    onReset(callback: () => void) {
        this._callbackOnReset = callback;
    }

    onMessage(message: IMessage) {
        this._message = message;
    }

    onItemsChange(callback: () => void) {
        this._callbackOnItemsChange = callback;
    }

    private _onWeightsChange() {
        if (!this._weights) return;

        if (this._state === State.PENDING) {
            if (this._weights && this._weights.getWeight() <= 0.01) {
                this._state = State.READY;
                this._onChange();
                this._weights.setPrice(null);
            }
            return;
        } else {
            if (this._order && this._weights)
                this._order.tara = this._weights.getTara();
        }

        if (!this._weights.isStable()) {
            this._throwMessage(MessageCode.WEIGHTS_NOT_STABLE);
            return;
        }

        if (this._weights.getWeight() <= 0.040) {
            this._throwMessage(MessageCode.WEIGHTS_IS_SMALL);
            return;
        }

        this._throwMessage(MessageCode.CLEAR_MESSAGE);
    }

    private _onItemsChange() {
        if (this._callbackOnItemsChange) this._callbackOnItemsChange();
    }
    
    private _onReset() {
        if (this._callbackOnReset) this._callbackOnReset();
    }

    private _throwMessage(code: MessageCode) {
        this._message?.sendMessage(code);
    }

    private _setTotal(value: number) {
        this._order!.total += value;
    }

    private _onChange() {
        if (this._callbackOnChange) this._callbackOnChange(this.getStateObject);
    }

}

export default OrderControl;
