import TabControl, { ITabControl } from './TabControl';
import { IOrder, Order } from './Order';
import { IClose, Close } from './Close';
import { IPrint, Print } from './Print';

export interface IOrdersControl {
    canCreateOrder: () => boolean;
    createOrder: () => void;
}

export class OrdersControl implements IOrdersControl {
    private _maxOrdersCount: number;
    private _orders: Map<number, IOrder> = new Map();
    private _ordersFreeNums: boolean[];
    private _orderControl: ITabControl;
    private _print: IPrint;
    private _close: IClose;

    constructor(maxOrdersCount: number) {
        this._maxOrdersCount = maxOrdersCount;
        this._orderControl = TabControl.getInstance();
        this._ordersFreeNums = Array(maxOrdersCount).fill(true);
        this._print = new Print();
        this._close = new Close();
        this._close.onStateChange(this.closeOrder.bind(this));
        this.createOrder();
    }

    private setCurrentOrder(order?: IOrder) {
        if (order) this._orderControl.setOrder(order);
        else if (this._orders.size) {
            const { value: firstOrderNumber } = this._orders.keys().next();
            this._orderControl.setOrder(this._orders.get(firstOrderNumber) as IOrder);
        } else {
            this.createOrder();
            return;
        }

        if (this._orders.size > 1 || this._orderControl.getItemsCount() > 0)
            this._close.setActive(true);
        else this._close.setActive(false);
    }

    createOrder() {
        if (!this.canCreateOrder()) return;
        const orderNumber = this._ordersFreeNums.findIndex(item => item === true);
        this._ordersFreeNums[orderNumber] = false;
        const order: IOrder = new Order(orderNumber);
        this._orders.set(orderNumber, order);
        this.setCurrentOrder(order);
    }

    private closeOrder() {
        const orderNumber = this._orderControl.getOrderNumber();
        this._orders.delete(orderNumber);
        this._ordersFreeNums[orderNumber] = true;
        this.setCurrentOrder();
    }

    private printOrder() {
        this._print.doPrint(this._orderControl.getOrder());
        this._close.doClose();
    }

    canCreateOrder() {
        return this._orders.size < this._maxOrdersCount;
    }
}

export default OrdersControl;
