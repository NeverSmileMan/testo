import TabControl, { IOrderControl } from './OrderControl';
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
    private _orderControl: IOrderControl;
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
        this._setCurrentOrder(orderNumber);
    }

    private _onOrderChange(init?: boolean) {
        const itemsCount = this._orderControl.getItemsCount();

        if ((init && itemsCount > 0) || itemsCount === 1) {
            this._print.setActive(true);
            this._close.setActive(true);
            return;
        }

        if (itemsCount === 0) {
            this._print.setActive(false);
            const ordersCount = this._orders.size;
            const orderNumber = this._orderControl.getOrderNumber();
            if (ordersCount === 1 && orderNumber === 1) {
                this._close.setActive(false);
            } else this._close.setActive(true);
        }

    }

    private _setCurrentOrder(orderNumber?: number) {
        
        if (orderNumber) {
            const order = this._orders.get(orderNumber);
            if (order) {
                this._orderControl.setOrder(order);
                this._onOrderChange(true);
                this._onChange();
                return;
            }
        }

        if (!this._orders.size) {
            this.createOrder();
            return;
        }

        const { value: firstOrderNumber } = this._orders.keys().next();
        this._setCurrentOrder(firstOrderNumber);
    }

    canCreateOrder() {
        return this._orders.size < this._maxOrdersCount;
    }

    createOrder() {
        if (!this.canCreateOrder()) return;
        const orderNumber = this._ordersFreeNums.findIndex(item => item) + 1;
        this._ordersFreeNums[orderNumber - 1] = false;
        const order: IOrder = new Order(orderNumber);
        this._orders.set(orderNumber, order);
        this._setCurrentOrder(orderNumber);
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
