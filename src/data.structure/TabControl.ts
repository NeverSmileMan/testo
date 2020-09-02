import { IItem, IItemAmount, ItemAmount } from './Item';
import Weights, { IWeights } from './Weights';
import InputList, { IInput } from './Input';
import { IOrder } from './Order';
import Message, { IMessage, MessageCode } from './Message';
import EventEmitter from 'events';

export interface ITabControl {
    order?: IOrder;
    setOrder: (order: IOrder) => void;
    delItem: (index: number) => void;
    getOrder: () => IOrder;
    getItems: () => IItemAmount[];
    getItemsCount: () => number;
    getOrderNumber: () => number;
    getTotal: () => number;
    // getMessage: () => IMessage | null;
    selectItem: (index: number) => void;
    isSelected: () => boolean;
    getSelectedItemIndex: () => number | null;
    on: (event: TabControlEvents, callback: () => void) => void;
    off: (event: TabControlEvents, callback: () => void) => void;
}

type TabControlEvents = 'stateChange';

class TabControl implements ITabControl {
    private _weights: IWeights;
    private _message: IMessage;
    private _selectedItemIndex: number | null = null;
    private _input: IInput;
    private _order?: IOrder;
    private _emitter: EventEmitter;

    constructor() {
        this._message = Message.getInstance();
        this._weights = Weights.getInstance();
        this._weights.on('stateChange', this._onWeightsChange.bind(this));
        this._input = InputList.getInstance({ tabIndex: 0 });
        this._input.setFocus();
        this._input.setCallbackOnSelect(this._addItem.bind(this));
        this._emitter = new EventEmitter();
    }

    setOrder(order: IOrder) {
        if (this._order) this._order.tara = this._weights.getTara();
        this._order = order;
        this._weights.setTara(this._order.tara);
    }

    selectItem(index: number | null) {
        if (this._selectedItemIndex !== index)
            this._selectedItemIndex = index;
        else this._selectedItemIndex = null;
        this._onChange();
    }

    isSelected() {
        return !(this._selectedItemIndex === null) && true || false;
    }

    getSelectedItemIndex() {
        return this._selectedItemIndex;
    }

    private _addItem(item: IItem) {
        // if (!this._weights.isStable()) {
        //     this._message = new Message('Вага не стабільна!', MessageType.WARNING);
        //     this._onChange();
        //     return;
        // }

        if (this._weights.getWeight() === 0) {
            this._throwMessage(MessageCode.WEIGHTS_IS_EMPTY);
            return;
        }

        this._weights.setPrice(item.price);
        //const newItem: IItemAmount = new ItemAmount(item, this._weights.getSum());
        const newItem: IItemAmount = new ItemAmount(item, 10);
        this._order!.items.push(newItem);
        this._setTotal(newItem.sum);
        this.selectItem(null);
        this._input.clearValue();
        this._onChange();
    }

    private _throwMessage(code: MessageCode | null) {
        this._message.sendMessage(code);
        this._onChange();
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

    getMessage() {
        return this._message;
    }

    private _setTotal(value: number) {
        this._order!.total += value;
    }

    getOrderNumber(): number {
        return this._order!.orderNumber;
    }

    on(event: TabControlEvents, callback: () => void) {
        this._emitter.on(event, callback);
    }

    off(event: TabControlEvents, callback: () => void) {
        this._emitter.on(event, callback);
    }

    private _onChange() {
        this._emitter.emit('stateChange');
    }

    private _onWeightsChange() {
        this._throwMessage(null);
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
