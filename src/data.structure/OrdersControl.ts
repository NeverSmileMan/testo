import TabControl, { ITabControl } from './TabControl';
import { IOrder, Order } from './Order';
import Close, { IClose } from './Close';
import Print, { IPrint } from './Print';
import { Printer } from './Printer';

export interface IOrdersControl {
    canCreateOrder: () => boolean;
    createOrder: () => void;
    onChange: (callback: () => void) => void;
    getOrders: () => Map<number, IOrder>;
    selectOrder: (orderNumber: number) => void;
}

export class OrdersControl implements IOrdersControl {
    private _maxOrdersCount: number;
    private _orders: Map<number, IOrder> = new Map();
    private _ordersFreeNums: boolean[];
    private _orderControl: ITabControl;
    private _print: IPrint;
    private _close: IClose;
    private _callbackOnChange?: () => void;
    
    constructor(maxOrdersCount: number) {
        this._maxOrdersCount = maxOrdersCount;
        this._orderControl = TabControl.getInstance();
        this._orderControl.on('stateChange', this._onOrderChange.bind(this));
        this._ordersFreeNums = Array(maxOrdersCount).fill(true);
        this._print = Print.getInstance();
        this._print.onPrint(this._printOrder.bind(this));        
        this._close = Close.getInstance();
        this._close.onClose(this._closeOrder.bind(this));
        this._setCurrentOrder();
    }

    selectOrder(orderNumber: number) {
        console.log('SELECT');
        this._setCurrentOrder(this._orders.get(orderNumber));
    }

    private _onOrderChange() {
        if (this._orderControl.getItemsCount() === 1)
            this._print.setActive(true);
        if (this._orderControl.getItemsCount() === 0)
            this._print.setActive(false);
    }

    private _setCurrentOrder(order?: IOrder) {
        if (order) this._orderControl.setOrder(order);
        else if (this._orders.size) {
            const { value: firstOrderNumber } = this._orders.keys().next();
            this._orderControl.setOrder(this._orders.get(firstOrderNumber) as IOrder);
        } else {
            this.createOrder();
            return;
        }

        if (this._orderControl.getItemsCount() > 0)
            this._print.setActive(true);
        else this._print.setActive(false);

        if (this._orders.size === 1 
            && this._orderControl.getItemsCount() === 0
            && this._orderControl.getOrderNumber() === 1) {
            this._close.setActive(false);
        }
        else this._close.setActive(true);

        this._onChange();
    }

    createOrder() {
        if (!this.canCreateOrder()) return;
        const orderNumber = this._ordersFreeNums.findIndex(item => item === true) + 1;
        this._ordersFreeNums[orderNumber - 1] = false;
        const order: IOrder = new Order(orderNumber);
        this._orders.set(orderNumber, order);
        this._setCurrentOrder(order);
    }

    private _closeOrder() {
        const orderNumber = this._orderControl.getOrderNumber();
        this._orders.delete(orderNumber);
        this._ordersFreeNums[orderNumber - 1] = true;
        this._setCurrentOrder();
    }

    private _printOrder() {
        new Printer(this._orderControl.getOrder());

        this._close.doClose();
    }

    canCreateOrder() {
        return this._orders.size < this._maxOrdersCount;
    }

    getOrders() {
        return this._orders;
    }

    onChange(callback: () => void) {
        this._callbackOnChange = callback;
    }

    private _onChange() {
        if (this._callbackOnChange) this._callbackOnChange();
    }
}

export default OrdersControl;
