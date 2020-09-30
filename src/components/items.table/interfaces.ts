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
export interface Item {
  defaults: Defaults;
  id: string;
  lifetime: Lifetime;
  plu: number;
  price: number;
  searchIndex: string;
  texts: Texts;
  type: ItemTypes;
  cost: number;
  amount: number;
}
