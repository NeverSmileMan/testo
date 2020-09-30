import { IItem } from './Item';
import { ItemTypes } from '../../enum/item.types';

export interface IItemAmount {
  item: IItem;
  weights?: number;
  quantity?: number;
  sum: number;
}

export class ItemAmount implements IItemAmount {
  weights?: number;

  quantity?: number;

  constructor(public item: IItem, public sum: number = 0, amount = 0) {
    if (item.type === ItemTypes.WEIGHED) this.weights = amount;
    else this.quantity = amount;
  }
}
