import { IItem, IItemAmount, ItemAmount } from './Item';
import Weights, { IWeights } from './Weights';
import InputObject, { IInput } from './Input';
import { IOrder } from './Order';
import Message, { IMessage } from './Message';
import { MessageCode } from './data/messagesInfo';
import ActiveInputService, { IActiveInputService } from './ActiveInputService';

import EventEmitter from 'events';
import { State, Mode } from './types';

export interface ITabControl {
    order?: IOrder;
    setOrder: (order: IOrder) => void;
    delItem: () => void;
    getOrder: () => IOrder;
    getItems: () => IItemAmount[];
    getItemsCount: () => number;
    getOrderNumber: () => number;
    getTotal: () => number;
    selectItem: (index: number) => void;
    isSelected: () => boolean;
    getSelectedItemIndex: () => number | null;
    on: (event: TabControlEvents, callback: () => void) => void;
    off: (event: TabControlEvents, callback: () => void) => void;
    getMode: () => Mode | null;
}

type TabControlEvents = 'stateChange';

class TabControl implements ITabControl {
    private _weights: IWeights;
    private _message: IMessage;
    private _selectedItemIndex: number | null = null;
    private _input: IInput;
    private _order?: IOrder;
    private _emitter: EventEmitter;
    private _keyboard: IActiveInputService;
    private _state: State = State.ENABLED;

    constructor() {
        this._message = Message.getInstance();
        this._weights = Weights.getInstance();
        this._weights.on('stateChange', this._onWeightsChange.bind(this));
        this._keyboard = ActiveInputService.getInstance();
        this._input = InputObject.getInputListInstance();
        this._keyboard.setActiveInput(this._input);
        this._input.onSelect(this._addItem.bind(this));
        this._emitter = new EventEmitter();
    }

    setOrder(order: IOrder) {
        if (this._order) this._order.tara = this._weights.getTara();
        this._order = order;
        this._weights.setTara(this._order.tara);
        this.selectItem(null);
        this._onWeightsChange();
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

    private _addItem(item: IItem) {
        if (!this._weights.isStable()) {
            this._throwMessage(MessageCode.WEIGHTS_NOT_STABLE);
            return;
        }

        if (this._weights.getWeight() <= 0.040) {
            this._throwMessage(MessageCode.WEIGHTS_IS_EMPTY);
            return;
        }

        this._weights.setPrice(item.price, item.name);
        const newItem: IItemAmount = new ItemAmount(item, this._weights.getSum());
        //const newItem: IItemAmount = new ItemAmount(item, 10);
        this._order!.items.push(newItem);
        this._setTotal(newItem.sum);
        this.selectItem(null);
        this._input.clearValue();
        this._state = State.PENDING;
        this._onChange();
    }

    private _throwMessage(code: MessageCode | null) {
        this._message.sendMessage(code);
        if (code === MessageCode.WEIGHTS_IS_EMPTY) {
            setTimeout(() => this._onWeightsChange(), 1000)
        }
        
        //this._onChange();
    }

    delItem() {
        if (!this.isSelected()) return;
        this._setTotal(-this._order!.items[this._selectedItemIndex!].sum);
        this._order!.items.splice(this._selectedItemIndex!, 1);
        this.selectItem(null);
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
        if (this._state === State.PENDING) {
            if (this._weights.getWeight() <= 0) {
                this._state = State.ENABLED;
                this._onChange();
            }
            return;
        }

        if (!this._weights.isStable()) {
            this._throwMessage(MessageCode.WEIGHTS_NOT_STABLE);
            return;
        }

        if (this._weights.getWeight() <= 0.040) {
            console.log(this._weights.getWeight());
            this._throwMessage(MessageCode.WEIGHTS_IS_SMALL);
            return;
        }

        this._throwMessage(null);
    }

    getMode() {
        if (this._state === State.PENDING) return Mode.MODAL;
        return null;
    }
}

let instance: ITabControl;

export function getInstance() {
    if (!instance) {
        instance = new TabControl();
    }
    return instance;
}

export default { getInstance };
