import { IGood } from './Good';

export interface IOrder {
    orderNumber: number;
    tara: number;
    items: IGood[];
    total: number;
}

export class Order implements IOrder {

    public orderNumber: number;
    public tara: number = 0;
    public items: IGood[] = [];
    public total: number = 0;

    constructor(number: number) {
        this.orderNumber = number;
    }
}

export default Order;
