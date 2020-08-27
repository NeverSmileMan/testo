import { IItem } from './Item';

export interface IList {
    setCallbackOnSelect: (callback: (item: IItem) => void) => void;
    setCallbackOnUpdate: (callback: () => void) => void;
    selectItem: (index: number) => void;
    getItems: () => IItem[] | null;
    setFilter: (filter: string) => void;
}

export class List implements IList {
    private _callbackOnSelect?: (item: IItem) => void;
    private _callbackOnUpdate?: () => void;
    private _Items: IItem[] | null = null;
    
    setFilter(filter: string) {
        if (!filter) this._Items = null;
        else this._Items = [] as IItem[];
        if (this._callbackOnUpdate) this._callbackOnUpdate();
    }
    
    getItems() {
        return this._Items;
    }

    selectItem(index: number) {
        if (this._callbackOnSelect)
            this._callbackOnSelect(this._Items![index]);
    }

    setCallbackOnSelect(callback: (item: IItem) => void) {
        this._callbackOnSelect = callback;
    }

    setCallbackOnUpdate(callback: () => void) {
        this._callbackOnUpdate = callback;
    }

}
