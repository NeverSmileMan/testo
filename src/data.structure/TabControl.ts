import { IItem, IItemAmount, ItemAmount } from './Item';
import Weights, { IWeights } from './Weights';
import InputList, { IInput } from './Input';
import { IOrder } from './Order';
import { Message, MessageType } from './Message';

export interface ITabControl {
    order?: IOrder;
    setOrder: (order: IOrder) => void;
    delItem: (index: number) => void;
    getOrder: () => IOrder;
    getItems: () => IItemAmount[];
    getItemsCount: () => number;
    getOrderNumber: () => number;
    getTotal: () => number;
    isSelected: () => boolean;
    setCallback: (callback: () => void) => void;
}

class TabControl implements ITabControl {

    private _weights: IWeights;
    private _message: Message | null = null;
    private _selectedItemIndex: number | null = null;
    private _input: IInput;
    private _order?: IOrder;
    private _callback?: () => void;

    constructor() {
        this._weights = Weights.getInstance();
        this._input = InputList.getInstance({ tabIndex: 0 });
        this._input.setFocus();
        this._input.setCallbackOnSelect(this._addItem.bind(this));
    }

    setOrder(order: IOrder) {
        if (this._order) this._order.tara = this._weights.getTara();
        this._order = order;
        this._weights.setTara(this._order.tara);
    }

    selectItem(index: number | null) {
        this._selectedItemIndex = index || null;
    }

    isSelected() {
        return this._selectedItemIndex && true || false;
    }

    private _addItem(item: IItem) {
        if (!this._weights.isStable()) {
            this._message = new Message('Вага не стабільна!', MessageType.WARNING);
            this._stateChanged();
            return;
        }

        if (this._weights.getWeight() === 0) {
            this._message = new Message('Поставте товар на ваги!', MessageType.WARNING);
            this._stateChanged();
            return;
        }

        this._weights.setPrice(item.price);
        const newItem: IItemAmount = new ItemAmount(item, this._weights.getSum());
        this._order!.items.push(newItem);
        this._setTotal(newItem.sum);
        this.selectItem(null);
        this._input.clearValue();
    }

    delItem() {
        if (!this.isSelected()) return;
        this._setTotal(-this._order!.items[this._selectedItemIndex!].price); //!
        this._order!.items.splice(this._selectedItemIndex!, 1);
    }

    getItems(): IItemAmount[] {
        return this._order!.items;
    }

    getOrder(): IOrder {
        return this._order!;
    }

    getItemsCount(): number {
        return this._order!.items.length;
    }

    getTotal(): number {
        return this._order!.total;
    }

    private _setTotal(value: number) {
        this._order!.total += value;
    }

    getOrderNumber(): number {
        return this._order!.orderNumber;
    }

    private _stateChanged() {
        if (this._callback) this._callback();
    }

    setCallback(callback: () => void) {
        this._callback = callback;
    }
}

let instance: ITabControl;

export function getInstance() {
    if (!instance) {
        console.log("NEW TAB CONTROL");
        instance = new TabControl();
    }
    return instance;
}

export default { getInstance };
