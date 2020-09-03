import EventEmitter from 'events';

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
    on: (event: WeightsEvents, callback: () => void) => void;
    off: (event: WeightsEvents, callback: () => void) => void;
    __setWeight: (value: number) => void;
}

type WeightsEvents = 'stateChange';

export class Weights implements IWeights{
    private _emitter: EventEmitter;
    private _isStable: boolean = true; //false
    private _tara: number = 0;
    private _price: number = 0;
    private _weight: number = 0;
    private _callbackOnStateChange?: () => void;

    /* Характеристики вагів: */
    public readonly minWeight: number = 0.04;
    public readonly midweight: number = 6;
    public readonly maxWeight: number = 15;
    public readonly maxTara: number = 6;
    public readonly minWeightResolution: number = 0.002;
    public readonly maxWeightResolution: number = 0.005;

    constructor() {
        this._emitter = new EventEmitter();
    }

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

    on(event: WeightsEvents, callback: () => void) {
        this._emitter.on(event, callback);
    }

    off(event: WeightsEvents, callback: () => void) {
        this._emitter.on(event, callback);
    }

    private setStable(isStable: boolean) {
        this._isStable = isStable;
        this._onStateChange();
    }
    private _onStateChange() {
        this._emitter.emit('stateChange');
    }

    __setWeight(value: number) {
        this._weight = value;
        this._onStateChange();
    }
}

let instance: IWeights;

export function getInstance() {
    if (!instance)
        instance = new Weights();
    return instance;
}

export default { getInstance };
