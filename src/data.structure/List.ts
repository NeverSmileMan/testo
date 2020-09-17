import { IItem } from './Item';
import itemsData from './data/items';

export interface IList {
    onChange: (callback: (getState: () => IItem[] | null) => void) => void;
    getItems: () => IItem[] | null;
    setFilter: (filter: string) => void;
}

class List implements IList {
    private _callbackOnChange?: (getState: () => IItem[] | null) => void;
    private _items: IItem[] | null = null;
    private _itemsData: IItem[];
    
    constructor() {
        this._itemsData = itemsData;
        this.getItems = this.getItems.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    setFilter(filter: string) {
        if (!filter) this._items = null;
        else this._search(filter);
        this._onChange();
    }
    
    getItems() {
        return this._items;
    }

    onChange(callback: (getState: () => IItem[] | null) => void) {
        this._callbackOnChange = callback;
    }

    private _onChange() {
        if (this._callbackOnChange) this._callbackOnChange(this.getItems);  
    }

    private _search(filter: string) {
        this._items = this._itemsData.filter(
            item => item.name.toUpperCase().includes(filter)
        );
    }

}

export default List;
