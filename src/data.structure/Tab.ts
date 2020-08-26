import { IGood } from './Good';
import { IWeights, } from './Weights';
import { IInput } from './Input';

export interface ITab {

    tabNumber: number;
    tara: number;

    addGood: (value: IGood) => void;
    delGood: (value: IGood) => void;
    getGoods: () => IGood[];
    getTotal: () => number;
}

export class Tab implements ITab {

    private _weights: IWeights;
    private _goods: Set<IGood> = new Set();
    private _total: number;
    private _message: Message | null= null;
    private _activeGood: IGood | null;
    private _input: IInput;
    public tabNumber: number;
    public tara: number = 0;

    constructor(weights: IWeights, input: IInput, number: number) {
        this._weights = weights;
        this.tabNumber = number;
        this._total = 0;
        this._activeGood = null;
        this._input = input;
    }

    selectGood(value: IGood) {
        this._activeGood = value;
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

        this._weights.setPrice(value.price);
        this._goods.add(value);
        this._total += this._weights.getSum();

        this._activeGood = null;
        return true;
    }

    delGood(value: IGood) {
        this._total -= 1;
        this._goods.delete(value);
    }

    getGoods(): IGood[] {
        return Array.from(this._goods);
    }

    getTotal() {
        return this._total;
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
