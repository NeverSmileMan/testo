import { IItem } from '../../data/Item';
import itemsDataNew from '../../data/items.json';
import {getItemsBySearchIndex} from '../../data/search.request';

const config = { server: false };

export interface IList {
    onChange: (callback: (getState: () => IItem[] | null) => void) => void;
    getItems: () => IItem[] | null;
    setFilter: (filter: string) => void;
}

class List implements IList {
    private _callbackOnChange?: (getState: () => IItem[] | null) => void;
    private _items: IItem[] | null = null;
    private _itemsData: IItem[];
    private _filter: string = '';

    constructor() {
        this._itemsData = itemsDataNew as unknown as IItem[];
        this.getItems = this.getItems.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    setFilter(filter: string) {
        this._filter = filter;
        if (!filter) {
            this._items = null;
            this._onChange();
        } else {
            this._search(filter)
                .then((result) =>
                    this._filter === filter
                    && (this._items = result)
                    && this._onChange());
        }
    }
    
    private _staticSearch = (filter: string) => {
        return this._itemsData.filter(
            item => item.searchIndex.toUpperCase().includes(filter)
                || String(item.plu).includes(filter)
        );
    }

    private _search(filter: string) {
        if (config.server) {
            return getItemsBySearchIndex(filter)
                .then(result => {
                    if (result) return result;
                    else return this._staticSearch(filter);
                })
                .catch(console.log);
        }
        return Promise.resolve(this._staticSearch(filter));
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

}

export default List;
