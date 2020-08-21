import { IGood, Good } from './Good';
import { IWeights, } from './Weights';

export interface ITab {

    tabNumber: number;
    tara: number;

    addGood: (value: IGood) => void;
    delGood: (value: IGood) => void;
    getGoods: () => IGood[];
}

export class Tab implements ITab {

    private _weights: IWeights;
    private _goods: Set<IGood>;
    private _total: number;
    private _message: Message;
    private _activeGood: IGood | null;
    public tabNumber: number;
    public tara: number;

    constructor(weights: IWeights, number: number) {
        this._weights = weights;
        this.tabNumber = number;
        this._total = 0;
        this._activeGood = null;
    }

    selectGood(value: IGood) {
        this._activeGood = value
    }

    addGood(value: IGood) {
        if (!this._weights.isStable()) {
            this._message = new Message('Вага не стабільна!', MessageType.WARNING);
            return false;
        }

        if (this._weights.getWeight() === 0) {
            this._message = new Message('Поставте товар на ваги!', MessageType.WARNING);
            return false;
        }

        this._goods.add(value);
        this._total += this._weights.getSum();
        return true;
    }

    delGood(value: IGood) {
        this._goods.delete(value);
    }

    getGoods(): IGood[] {
        return Array.from(this._goods);
    }

}

enum MessageType {
    INFO,
    WARNING,
    ERROR,
}

class Message {
    public text: string;
    public type: MessageType;

    constructor(text: string, type: MessageType) {
        this.text = text;
        this.type = type
    }
}

export default Tab;
