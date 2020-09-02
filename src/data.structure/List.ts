import { IItem } from './Item';
import itemsData from './data/items';

export interface IList {
    onSelect: (callback: (item: IItem) => void) => void;
    onUpdate: (callback: () => void) => void;
    selectItem: (index: number) => void;
    getItems: () => IItem[] | null;
    setFilter: (filter: string) => void;
}

export class List implements IList {
    private _callbackOnSelect?: (item: IItem) => void;
    private _callbackOnUpdate?: () => void;
    private _items: IItem[] | null = null;
    private _itemsData: IItem[];
    
    constructor() {
        this._itemsData = itemsData;
    }

    setFilter(filter: string) {
        if (!filter) this._items = null;
        else this._search(filter);
        this._onUpdate();
    }
    
    getItems() {
        return this._items;
    }

    selectItem(index: number) {
        this._onSelect(this._items![index]);
    }

    onSelect(callback: (item: IItem) => void) {
        this._callbackOnSelect = callback;
    }

    onUpdate(callback: () => void) {
        this._callbackOnUpdate = callback;
    }

    private _onUpdate() {
        if (this._callbackOnUpdate) this._callbackOnUpdate();   
    }

    private _onSelect(item: IItem) {
        if (this._callbackOnSelect) this._callbackOnSelect(item);
    }

    private _search(filter: string) {
        this._items = this._itemsData.filter(item => item.name.includes(filter));
    }

}
