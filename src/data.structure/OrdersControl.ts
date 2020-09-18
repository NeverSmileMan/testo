import { OrderControl, IOrderControl } from './OrderControl';
import { Order, IOrder, IOrders } from './Order';
import { Printer } from './Printer';

export interface IOrdersControl {
    canCreateOrder: () => boolean;
    createOrder: () => void;
    selectOrder: (orderNumber: number) => void;
    getOrders: () => IOrders;
    getOrderControl: () => IOrderControl;
    onChange: (callback: (getState: () => IStateOrders) => void) => void;
    printIsActive: boolean;
    closeIsActive: boolean;
    printOrder: () => void;
    deleteOrder: () => void;
    getStateOrders: () => IStateOrders;
    doClose: (callback: () => void) => void;
}

export interface IStateOrders {
    // currentOrder: IOrderControl;
    printIsActive: boolean;
    closeIsActive: boolean;
    ordersNumbers: number[];
    currentOrderNumber: number | null;
    canCreate: boolean;
    doClose: (callback: () => void) => void;
}

export class OrdersControl implements IOrdersControl {
    private _orders: IOrders = new Map();
    private _ordersFreeNums: boolean[]; 
    private _callbackOnChange?: (getState: () => IStateOrders) => void;
    printIsActive: boolean = false;
    closeIsActive: boolean = false;
    private _orderControl: IOrderControl;
    private _callbackOnClose?: () => void;
    
    constructor(private _maxOrdersCount: number) {
        this._ordersFreeNums = Array(this._maxOrdersCount).fill(true);
        this.getStateOrders = this.getStateOrders.bind(this);
        this.doClose = this.doClose.bind(this);
        this._orderControl = new OrderControl();
        this._orderControl.onItemsChange(this._onOrderChange.bind(this));
        this._setCurrentOrder(); //може повертати значення
    }

    doClose(callback: () => void) {
        this._callbackOnClose = callback;
    }

    _doClose() {
        if (this._callbackOnClose) this._callbackOnClose();
    }

    getStateOrders() {
        return {
            // currentOrder: this._orderControl,
            printIsActive: this.printIsActive,
            closeIsActive: this.closeIsActive,
            ordersNumbers: [...this.getOrders().keys()],
            currentOrderNumber: this._orderControl?.getOrderNumber() || null,
            canCreate: this.canCreateOrder(),
            doClose: this.doClose.bind(this),
        };
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

    getOrderControl() {
        return this._orderControl;
    }

    getOrders() {
        return this._orders;
    }

    onChange(callback: (getState: () => IStateOrders) => void) {
        this._callbackOnChange = callback;
    }

    private _onChange() {
        if (this._callbackOnChange) this._callbackOnChange(this.getStateOrders);
    }

    private _setCurrentOrder(orderNumber?: number) {
        // if (this._orderControl) {
        //     this._orderControl.getOrder().tara = weights.getTara(); //??????????
        // }
        if (orderNumber) {
            const order = this._orders.get(orderNumber);
            if (order) {
                // this._orderControl = new OrderControl(order);
                
                this._orderControl.setOrder(order);
                //this._onOrderChange(true);
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

    deleteOrder() {
        const orderNumber = this._orderControl?.getOrderNumber();
        if (!orderNumber) return;
        this._orders.delete(orderNumber);
        this._ordersFreeNums[orderNumber - 1] = true;
        this._setCurrentOrder();
    }

    printOrder() {
        const order = this._orderControl?.getOrder();
        if (!order) return;
        new Printer(order);
        this._doClose();
    }

    private _onOrderChange(init?: boolean) {
        if (!this._orderControl) return;

        const itemsCount = this._orderControl.getItemsCount();

        if ((init && itemsCount > 0) || itemsCount === 1) {
            this.printIsActive = true;
            this.closeIsActive = true;
            !init && this._onChange();
            return;
        }

        if (itemsCount === 0) {
            const ordersCount = this._orders.size;
            const orderNumber = this._orderControl.getOrderNumber();
            if (ordersCount === 1 && orderNumber === 1) {
                this.closeIsActive = false;
            } else {
                this.closeIsActive = true;
            }
            this.printIsActive = false;
            !init && this._onChange();
        }
    }
}

export default OrdersControl;
