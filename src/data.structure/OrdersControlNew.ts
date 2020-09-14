import { OrderControl, IOrderControl } from './OrderControlNew';
import { Order, IOrder } from './Order';
import Close, { IClose } from './Close';
import Print, { IPrint } from './Print';
import { Printer } from './Printer';

export type IOrders = Map<number, IOrder>;

// export interface IOrderControl {
//     setOrder: (order: IOrder) => void;
//     getOrder: () => IOrder;
//     getOrderNumber: () => number;     
//     delItem: () => void;
//     getItems: () => IItemAmount[];
//     selectItem: (index: number | null) => void;
//     isSelected: () => boolean;
//     getSelectedItemIndex: () => number | null;    
//     // getItemsCount: () => number;
//     getTotal: () => number;
//     onChange: (callback: () => void) => void;
//     off: (event: EventType, callback: () => void) => void;
//     getState: () => State;
//     addItem: (item: IItem) => void;
// }

export interface IOrdersControl extends IOrderControl{
    canCreateOrder: () => boolean;
    createOrder: () => void;
    selectOrder: (orderNumber: number) => void;
    getCurrentOrder: () => IOrder | null;
    getOrders: () => IOrders;    
    onChangeOrders: (callback: () => void) => void;

    printIsActive: boolean;
    closeIsActive: boolean;
    printOrder: () => void;
    deleteOrder: () => void;
}

export class OrdersControl extends OrderControl implements IOrdersControl {
    // private _currentOrder: IOrder | null = null;
    private _orders: IOrders = new Map();
    private _ordersFreeNums: boolean[];
    // private _orderControl: IOrderControl;
    //private _print: IPrint;
    //private _close: IClose;  
    private _callbackOnChangeOrders?: () => void;

    printIsActive: boolean = false;
    closeIsActive: boolean = false;

    constructor(private _maxOrdersCount: number) {
        super();
        // this._orderControl = OrderControl.getInstance();
        // this._orderControl.onChange(this._onOrderChange.bind(this));
        this._ordersFreeNums = Array(this._maxOrdersCount).fill(true);
        //this._print = Print.getInstance();
        //this._print.onPrint(this._printOrder.bind(this));      
        //this._close = Close.getInstance();
        //this._close.onClose(this._deleteOrder.bind(this));
        this._setCurrentOrder();
    }

    protected _onChange() {
        super._onChange();
        this._onOrderChange(); 
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
        return this._currentOrder;
    }

    getOrders() {
        return this._orders;
    }

    onChangeOrders(callback: () => void) {
        this._callbackOnChangeOrders = callback;
    }

    private _onChangeOrders() {
        if (this._callbackOnChangeOrders) this._callbackOnChangeOrders();
    }

    private _setCurrentOrder(orderNumber?: number) {
        
        if (orderNumber) {
            const order = this._orders.get(orderNumber);
            if (order) {
                this._currentOrder = order;
                // this._orderControl.setOrder(order);
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
        //this._close.doAction(); ????????
    }

    private _onOrderChange(init?: boolean) {
        const itemsCount = this._currentOrder?.items.length || 0;

        if ((init && itemsCount > 0) || itemsCount === 1) {
            //this._print.setActive(true);
            this.printIsActive = true;
            //this._close.setActive(true);
            this.closeIsActive = true;
            this._onChangeOrders(); //???
            return;
        }

        if (itemsCount === 0) {
            //this._print.setActive(false);
            const ordersCount = this._orders.size;
            const orderNumber = this._currentOrder?.orderNumber;
            if (ordersCount === 1 && orderNumber === 1) {
                //this._close.setActive(false);
                this.closeIsActive = false;
            } else {
                //this._close.setActive(true);
                this.closeIsActive = true;
            }
            this._onChangeOrders(); //???
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
