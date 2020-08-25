/* Якщо вага менше minWeight ? */

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
    private _isStable: boolean;
    private _sum: number;
    private _tara: number;
    private _price: number;
    private _weight: number;

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

    getSum(): number { // вартість = _price * _weight;
        return this._sum;
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
}

export default Weights;
