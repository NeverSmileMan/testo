

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
    plu: number;
    name: string;
    price: number;
    type: GoodType;

    constructor() {
        
    }
}
