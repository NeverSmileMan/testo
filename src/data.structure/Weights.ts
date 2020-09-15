export interface IWeights {

    readonly minWeight: number;
    readonly midweight: number;
    readonly maxWeight: number;
    readonly maxTara: number;
    readonly minWeightResolution: number;
    readonly maxWeightResolution: number;

    isStable: () => boolean;
    getSum: () => number;
    setTara: (value: number) => void;
    getTara: () => number;
    setPrice: (value: number | null, title?: string) => void;
    getWeight: () => number;
    onChange: (callback: () => void) => void;
}

export interface IStateWeights {
    isStable: boolean;
    tara: number;
    setTara: (value: number) => void;
    weight: number;
    setPrice: (value: number | null, title?: string) => void;
    sum: number;
    price: number;
    title: string;
    getStateWeights: () => IStateWeights;
}

export class Weights implements IWeights {
    protected _isStable: boolean = true;
    private _tara: number = 0;
    protected _price: number = 0;
    protected _weight: number = 0;
    protected _title: string = '';
    private _callbackOnChange?: () => void;

    /* Характеристики вагів: */
    public readonly minWeight: number = 0.04;
    public readonly midweight: number = 6;
    public readonly maxWeight: number = 15;
    public readonly maxTara: number = 6;
    public readonly minWeightResolution: number = 0.002;
    public readonly maxWeightResolution: number = 0.005;

    isStable(): boolean {
        return this._isStable;
    }

    getSum(): number {
        return (this._weight - this._tara) * this._price;
    }

    setTara(value: number) {
        this._tara = value;
        this._onChange();
    }

    getTara(): number {
        return this._tara;
    }

    setPrice(value: number | null, title: string = '') {
        this._price = value || 0;
        this._title = title || '';
        this._onChange()
    }

    getWeight(): number {
        return this._weight - this._tara;
    }

    onChange(callback: () => void) {
        this._callbackOnChange = callback;
    }

    protected _onChange() {
        if (this._callbackOnChange) this._callbackOnChange();
    }
}

export interface IWeightsTest extends IWeights {
    getStateWeights: () => IStateWeights;
    __setWeight: (value: number) => void;
    __getPrice: () => number;
    __getTitle: () => string;
    __setStable: (isStable?: boolean) => void;
}

class WeightsTest extends Weights implements IWeightsTest {
    constructor() {
        super();
        this.getStateWeights = this.getStateWeights.bind(this);
    }

    getStateWeights(): IStateWeights {
        return {
            isStable: this.isStable(),
            tara: this.getTara(),
            setTara: this.setTara.bind(this),
            weight: this.getWeight(),
            setPrice: this.setPrice.bind(this),
            sum: this.getSum(),
            price: this.__getPrice(),
            title: this.__getTitle(),
            getStateWeights: this.getStateWeights,
        };
    }

    __setWeight(value: number) {
        this._weight = value;
        this._onChange();
    }

    __setStable(isStable?: boolean) {
        this._isStable = isStable === undefined ? !this._isStable : isStable;
        this._onChange();
    }

    __getPrice() {
        return this._price;
    }

    __getTitle() {
        return this._title;
    }
}

export default WeightsTest;
