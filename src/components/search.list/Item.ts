import { ItemTypes } from '../../enum/item.types';
interface Defaults {
  tara: number;
  pieces_per_package: number;
}

interface Lifetime {
  shelf_life_1: number;
}

interface Texts {
  article: string;
  full_title: string;
  shop: string;
  short_title: string;
}

export interface IItem {
  defaults: Defaults;
  id: string;
  lifetime: Lifetime;
  plu: number;
  price: number;
  searchIndex: string;
  texts: Texts;
  type: ItemTypes;
}

export class Item implements IItem {
  constructor(
    public id = '', // "5dd75571-995a-099a-e1f8-bd7827b50976",
    public plu = 0, // 5842
    public searchIndex = '', // "Печінка свиняча (Сиров)\r\n#41#Печень свиная(Сырье)",
    public price = 0, // 15.2,
    public type = ItemTypes.WEIGHED, // "weighed",
    public defaults = {
      tara: 0, // 0,
      pieces_per_package: 0, // 0
    },
    public lifetime = {
      shelf_life_1: 0, // 0
    },
    public texts = {
      article: '', // "34583",
      shop: 'Сильпо Винница', // "Сильпо Винница",
      short_title: '', // "Печiнка свиняча (Сир",
      full_title: '', // "Печінка свиняча (Сиров)"
    },
  ) {}
}

/*
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
*/

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
