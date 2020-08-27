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
    setPrice: (value: number) => void;
    getWeight: () => number;
}

export class Weights implements IWeights{
    private _isStable: boolean = false;
    private _tara: number = 0;
    private _price: number = 0;
    private _weight: number = 0;
    private _callback?: (isStable: boolean) => void;

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
        return this._weight * this._price;
    }

    setTara(value: number) {
        this._tara = value;
    }

    getTara(): number {
        return this._tara;
    }

    setPrice(value: number) {
        this._price = value;
    }

    getWeight(): number {
        return this._weight;
    }

    setCallback(callback: (isStable: boolean) => void) {
        this._callback = callback;
    }

    private setStable(isStable: boolean) {
        this._isStable = isStable;
        if (this._callback) this._callback(isStable);
    }
}

let instance: IWeights;

export function getInstance() {
    if (!instance)
        instance = new Weights();
    return instance;
}

export default { getInstance };
