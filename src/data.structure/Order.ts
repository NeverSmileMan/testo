import { IItemAmount } from './Item';

export interface IOrder {
    orderNumber: number;
    tara: number;
    items: IItemAmount[];
    total: number;
}

export type IOrders = Map<number, IOrder>;

export class Order implements IOrder {

    public orderNumber: number;
    public tara: number = 0;
    public items: IItemAmount[] = [];
    public total: number = 0;

    constructor(number: number) {
        this.orderNumber = number;
    }
}

export default Order;
