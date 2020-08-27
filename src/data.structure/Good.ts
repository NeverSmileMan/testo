enum GoodType {
    WEIGHT,
    PIECE,
}

export interface IGood {
    plu: number;
    name: string;
    price: number;
    type: GoodType;
}

export class Good implements IGood {

    constructor(
        public plu: number = 0,
        public name: string = '',
        public price: number = 0,
        public type: GoodType = GoodType.WEIGHT) {
    }
}

export interface IGoodAmount extends IGood {
    weights?: number;
    quantity?: number;
    sum: number;
}

export class GoodAmount extends Good implements IGoodAmount{
    weights?: number;
    quantity?: number;

    constructor(
        public item: IGood,
        public sum: number = 0,
        amount: number = 0,
        ) {

        super(
            item.plu,
            item.name,
            item.price,
            item.type,
        );

        if (item.type === GoodType.WEIGHT)
            this.weights = amount;
        else this.quantity = amount;
    }
}
