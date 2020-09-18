import { IItem, IItemAmount, ItemAmount } from './Item';
import Weights, { IWeightsTest } from './Weights';
import { IOrder } from './Order';
import { MessageCode } from './data/messagesInfo';
import { State, Mode } from './types/types';
import Message from './Message';
import IObject from './types/objects';

export interface IOrderControl extends IObject<IStateOrder> {
    getOrder: () => IOrder | null;
    getOrderNumber: () => number | null;
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
    setOrder: (order: IOrder) => void;
    initOrder: () => void;
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
    private _weights: IWeightsTest = Weights.getInstance();
    private _selectedItemIndex: number | null = null;
    private _order?: IOrder;
    private _state: State = State.ENABLED;
    private _callbackOnChange?: (getState: () => IStateOrder) => void;
    private _callbackOnReset?: () => void;
    private _callbackOnMessage?: (code: MessageCode | null) => void;
    private _callbackOnItemsChange?: () => void;

    constructor() {
        // this._order = order;
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

    setOrder(order: IOrder) {
        this._order = order
        this.selectItem(null);
        // this.onWeightsChange();
        this._onItemsChange();
        this._onChange();       
    }

    initOrder() {
        if (!this._order) return;
        this._weights?.setTara(this._order.tara);
        // this.selectItem(null);
        this.onWeightsChange();
        // this._onItemsChange();
        // this._onChange();
    }

    onMessage(callback: (code: MessageCode | null) => void) { //null ???????
        this._callbackOnMessage = callback;
    }

    onReset(callback: () => void) {
        this._callbackOnReset = callback;
    }

    getCurrentOrder() {
        return this._order;
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
        return this._order || null;
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
            console.log("MESS");
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

    private _throwMessage(code: MessageCode | null) {
        if (this._callbackOnMessage) { 
            this._callbackOnMessage(code);
        }
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

    getTotal(): number {
        return this._order ? this._order.total : 0;
    }

    private _setTotal(value: number) {
        this._order!.total += value;
    }

    getOrderNumber() {
        return this._order?.orderNumber || null;
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
            if (this._order) this._order.tara = this._weights.getTara();
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
