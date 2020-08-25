import { IGood } from './Good';

export interface IList {
    getGoods: (filter: string) => void;
    selectGood: (value: IGood) => void;
    showList: (value: boolean) => void;
}

export class List implements IList {
    private _callback: (value: IGood) => void;
    private _goods: IGood[];
    private _show: boolean;

    constructor(callback: (value: IGood) => void) {
        this._callback = callback;
    }
    
    getGoods(filter: string) {
        this._goods = {} as IGood[]
        return {};
    }

    selectGood(value: IGood) {
        this._callback(value);
    }

    showList(value: boolean) {
        this._show = value;
    }
}
