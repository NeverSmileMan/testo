import { IItem } from './Item';
import itemsData from './data/items';

export interface IList {
    onChange: (callback: (items: IItem[] | null) => void) => void;
    getItems: () => IItem[] | null;
    setFilter: (filter: string) => void;
}

class List implements IList {
    private _callbackOnChange?: (items: IItem[] | null) => void;
    private _items: IItem[] | null = null;
    private _itemsData: IItem[];
    
    constructor() {
        this._itemsData = itemsData;
    }

    setFilter(filter: string) {
        if (!filter) this._items = null;
        else this._search(filter);
        this._onChange();
    }
    
    getItems() {
        return this._items;
    }

    onChange(callback: (items: IItem[] | null) => void) {
        this._callbackOnChange = callback;
    }

    private _onChange() {
        if (this._callbackOnChange) this._callbackOnChange(this._items);   
    }

    private _search(filter: string) {
        this._items = this._itemsData.filter(
            item => item.name.toUpperCase().includes(filter)
        );
    }

}

export default List;
