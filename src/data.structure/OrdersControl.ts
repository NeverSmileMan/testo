import OrderControl, { IOrderControl } from './OrderControl';
import { Order, IOrder } from './Order';
import Close, { IClose } from './Close';
import Print, { IPrint } from './Print';
import { Printer } from './Printer';

export type IOrders = Map<number, IOrder>;

export interface IOrdersControl {
    canCreateOrder: () => boolean;
    createOrder: () => void;
    selectOrder: (orderNumber: number) => void;
    getCurrentOrder: () => IOrder;
    getOrders: () => IOrders;    
    onChange: (callback: () => void) => void;
}

export class OrdersControl implements IOrdersControl {
    private _orders: IOrders = new Map();
    private _ordersFreeNums: boolean[];
    private _orderControl: IOrderControl;
    private _print: IPrint;
    private _close: IClose;
    private _callbackOnChange?: () => void;

    constructor(private _maxOrdersCount: number) {
        this._orderControl = OrderControl.getInstance();
        this._orderControl.onChange(this._onOrderChange.bind(this));
        this._ordersFreeNums = Array(this._maxOrdersCount).fill(true);
        this._print = Print.getInstance();
        this._print.onPrint(this._printOrder.bind(this));        
        this._close = Close.getInstance();
        this._close.onClose(this._deleteOrder.bind(this));
        this._setCurrentOrder();
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

    selectOrder(orderNumber: number) {
        this._setCurrentOrder(orderNumber);
    }

    getCurrentOrder() {
        return this._orderControl.getOrder();
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

    private _deleteOrder() {
        const orderNumber = this._orderControl.getOrderNumber();
        this._orders.delete(orderNumber);
        this._ordersFreeNums[orderNumber - 1] = true;
        this._setCurrentOrder();
    }

    private _printOrder() {
        new Printer(this._orderControl.getOrder());
        this._close.doAction();
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
}

let instance: OrdersControl;

export function getInstance(maxOrdersCount: number = 1) {
    if (!instance) {
        instance = new OrdersControl(maxOrdersCount);
    }
    return instance;
}

export default { getInstance };
