import { IGood } from './Good';

export interface IList {
    getGoods: (filter: string) => void;
    selectGood: (value: IGood) => void;
    showList: () => boolean;
}

export class List implements IList {
    private _callback: (value: IGood) => void;
    private _goods: IGood[] | null = null;

    constructor(callback: (value: IGood) => void) {
        this._callback = callback;
    }
    
    getGoods(filter: string) {
        if (!filter) {
            this._goods = null;
        } else {
            this._goods = [] as IGood[]
        }
        return this._goods;
    }

    selectGood(value: IGood) {
        this._callback(value);
    }

    showList() {
        return this._goods && true || false;
    }
}
