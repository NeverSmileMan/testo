export enum ItemType {
    WEIGHT = 'weighed',
    PIECE = 'piece',
}

export interface IItem {
    id: string; // "5dd75571-995a-099a-e1f8-bd7827b50976",
    plu: number; // 5842
    searchIndex: string; //"Печінка свиняча (Сиров)\r\n#41#Печень свиная(Сырье)",
    price: number; // 15.2,
    type: ItemType; // "weighed",
    defaults: {
        tara: number; // 0,
        pieces_per_package: number; // 0
    };
    lifetime: {
        shelf_life_1: number; // 0
    };
    texts: {
        article: number; // "34583",
        shop: string; // "Сильпо Винница",
        short_title: string; // "Печiнка свиняча (Сир",
        full_title: string; //"Печінка свиняча (Сиров)"
    };
}

export class Item implements IItem {

    constructor(
        public id = '', // "5dd75571-995a-099a-e1f8-bd7827b50976",
        public plu = 0, // 5842
        public searchIndex = '', //"Печінка свиняча (Сиров)\r\n#41#Печень свиная(Сырье)",
        public price = 0, // 15.2,
        public type = ItemType.WEIGHT, // "weighed",
        public defaults = {
            tara: 0, // 0,
            pieces_per_package: 0, // 0
        },
        public lifetime = {
            shelf_life_1: 0, // 0
        },
        public texts = {
            article: 0, // "34583",
            shop: 'Сильпо Винница', // "Сильпо Винница",
            short_title: '', // "Печiнка свиняча (Сир",
            full_title: '', //"Печінка свиняча (Сиров)"
        },
    ) {

    }
}

export interface IItemAmount {
    item: IItem;
    weights?: number;
    quantity?: number;
    sum: number;
}

export class ItemAmount implements IItemAmount{
    weights?: number;
    quantity?: number;

    constructor(
        public item: IItem,
        public sum: number = 0,
        amount: number = 0,
        ) {
        if (item.type === ItemType.WEIGHT)
            this.weights = amount;
        else this.quantity = amount;
    }
}

/*
[{
    "id":"5dd75571-995a-099a-e1f8-bd7827b50976",
    "plu":5842,
    "searchIndex":"Печінка свиняча (Сиров)\r\n#41#Печень свиная(Сырье)",
    "price":15.2,
    "type":"weighed",
    "defaults":{
        "tara":0,
        "pieces_per_package":0
    },
    "lifetime":{
        "shelf_life_1":0
    },
    "texts":{
        "article":"34583",
        "shop":"Сильпо Винница",
        "short_title":"Печiнка свиняча (Сир",
        "full_title":"Печінка свиняча (Сиров)"
    }
}]
*/