import { OrderControl, IOrderControl } from './OrderControl';
import { Order, IOrder, IOrders } from './Order';
import { Printer } from './Printer';

export interface IOrdersControl extends IOrderControl {
    canCreateOrder: () => boolean;
    createOrder: () => void;
    selectOrder: (orderNumber: number) => void;
    getOrders: () => IOrders;
    onChangeOrders: (callback: (getState: () => IStateOrders) => void) => void;
    printIsActive: boolean;
    closeIsActive: boolean;
    printOrder: () => void;
    deleteOrder: () => void;
    getStateOrders: () => IStateOrders;
    doClose: (callback: () => void) => void;
}

export interface IStateOrders {
    printIsActive: boolean;
    closeIsActive: boolean;
    ordersNumbers: number[];
    currentOrderNumber: number | null;
    canCreate: boolean;
    doClose: (callback: () => void) => void;
    // getStateOrders: () => IStateOrders;
}

export class OrdersControl extends OrderControl implements IOrdersControl {
    private _orders: IOrders = new Map();
    private _ordersFreeNums: boolean[]; 
    private _callbackOnChangeOrders?: (getState: () => IStateOrders) => void;
    printIsActive: boolean = false;
    closeIsActive: boolean = false;
    private _callbackOnClose?: () => void;

    constructor(private _maxOrdersCount: number) {
        super();
        this._ordersFreeNums = Array(this._maxOrdersCount).fill(true);
        this.getStateOrders = this.getStateOrders.bind(this);
        // this.onMessage(Message.getInstance().sendMessage);
        // this.onMessage = this.onMessage.bind(this);
        this._setCurrentOrder();
    }

    doClose(callback: () => void) {
        this._callbackOnClose = callback;
    }

    _doClose() {
        if (this._callbackOnClose) this._callbackOnClose();
    }

    protected _onChangeOrder() {
        this._onOrderChange(false);
        super._onChangeOrder();
        this._onOrderChange(false);
    }

    getStateOrders() {
        return {
            printIsActive: this.printIsActive,
            closeIsActive: this.closeIsActive,
            ordersNumbers: [...this.getOrders().keys()],
            currentOrderNumber: this.getOrderNumber(),
            canCreate: this.canCreateOrder(),
            doClose: this.doClose.bind(this),
            // getStateOrders: this.getStateOrders,
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


    getOrders() {
        return this._orders;
    }

    onChangeOrders(callback: (getState: () => IStateOrders) => void) {
        this._callbackOnChangeOrders = callback;
    }

    private _onChangeOrders() {
        if (this._callbackOnChangeOrders) this._callbackOnChangeOrders(this.getStateOrders);
    }

    private _setCurrentOrder(orderNumber?: number) {
        
        if (orderNumber) {
            const order = this._orders.get(orderNumber);
            if (order) {
                this._currentOrder = order;
                this._onChangeOrder();
                this._onOrderChange(true);
                this._onChangeOrders();
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
        const orderNumber = this._currentOrder?.orderNumber;
        if (!orderNumber) return;
        this._orders.delete(orderNumber);
        this._ordersFreeNums[orderNumber - 1] = true;
        this._setCurrentOrder();
    }

    printOrder() {
        new Printer(this.getCurrentOrder()!);
        this._doClose();
    }

    private _onOrderChange(init?: boolean) {
        const itemsCount = this.getItemsCount();
        if ((init && itemsCount > 0) || itemsCount === 1) {
            this.printIsActive = true;
            this.closeIsActive = true;
            !init && this._onChangeOrders();
            return;
        }

        if (itemsCount === 0) {
            const ordersCount = this._orders.size;
            const orderNumber = this._currentOrder?.orderNumber;
            if (ordersCount === 1 && orderNumber === 1) {
                this.closeIsActive = false;
            } else {
                this.closeIsActive = true;
            }
            this.printIsActive = false;
            !init && this._onChangeOrders();
        }
    }
}

export default OrdersControl;
