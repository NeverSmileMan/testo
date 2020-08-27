import { IGood } from './Good';

export interface IList {
    setCallbackOnSelect: (callback: (item: IGood) => void) => void;
    setCallbackOnUpdate: (callback: () => void) => void;
    selectItem: (index: number) => void;
    getItems: () => IGood[] | null;
    setFilter: (filter: string) => void;
}

export class List implements IList {
    private _callbackOnSelect?: (item: IGood) => void;
    private _callbackOnUpdate?: () => void;
    private _goods: IGood[] | null = null;
    
    setFilter(filter: string) {
        if (!filter) this._goods = null;
        else this._goods = [] as IGood[];
        if (this._callbackOnUpdate) this._callbackOnUpdate();
    }
    
    getItems() {
        return this._goods;
    }

    selectItem(index: number) {
        if (this._callbackOnSelect)
            this._callbackOnSelect(this._goods![index]);
    }

    setCallbackOnSelect(callback: (item: IGood) => void) {
        this._callbackOnSelect = callback;
    }

    setCallbackOnUpdate(callback: () => void) {
        this._callbackOnUpdate = callback;
    }

}
