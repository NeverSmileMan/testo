import { IGood } from './Good';

export interface IList {
    getGoods: (filter: string) => void;
    setCallback: (callback: (good: IGood) => void) => void;
    selectGood: (value: IGood) => void;
    showList: () => boolean;
}

export class List implements IList {
    private _callback?: (good: IGood) => void;
    private _goods: IGood[] | null = null;
    
    getGoods(filter: string) {
        if (!filter) {
            this._goods = null;
        } else {
            this._goods = [] as IGood[]; //request
        }
        return this._goods;
    }

    selectGood(good: IGood) {
        if (this._callback) this._callback(good);
    }

    setCallback(callback: (good: IGood) => void) {
        this._callback = callback;
    }

    showList() {
        return this._goods && true || false;
    }
}
