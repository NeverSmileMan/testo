enum ItemType {
    WEIGHT,
    PIECE,
}

export interface IItem {
    plu: number;
    name: string;
    price: number;
    type: ItemType;
}

export class Item implements IItem {

    constructor(
        public plu: number = 0,
        public name: string = '',
        public price: number = 0,
        public type: ItemType = ItemType.WEIGHT) {
    }
}

export interface IItemAmount extends IItem {
    weights?: number;
    quantity?: number;
    sum: number;
}

export class ItemAmount extends Item implements IItemAmount{
    weights?: number;
    quantity?: number;

    constructor(
        public item: IItem,
        public sum: number = 0,
        amount: number = 0,
        ) {

        super(
            item.plu,
            item.name,
            item.price,
            item.type,
        );

        if (item.type === ItemType.WEIGHT)
            this.weights = amount;
        else this.quantity = amount;
    }
}
