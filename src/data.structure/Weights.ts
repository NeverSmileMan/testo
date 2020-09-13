import EventEmitter from 'events';
import { EventType } from './types/types';

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
    off: (event: EventType, callback: () => void) => void;
}

export class Weights implements IWeights {
    private _emitter: EventEmitter;
    protected _isStable: boolean = true; //false
    private _tara: number = 0;
    protected _price: number = 0;
    protected _weight: number = 0;
    protected _title: string = '';

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
        this._emitter.on(EventType.STATE_CHANGE, callback);
    }

    off(event: EventType, callback: () => void) {
        this._emitter.on(event, callback);
    }

    protected _onChange() {
        this._emitter.emit(EventType.STATE_CHANGE);
    }
}

interface IWeightsTest extends IWeights {
    __setWeight: (value: number) => void;
    __getPrice: () => number;
    __getTitle: () => string;
    __setStable: (isStable: boolean) => void;
}

class WeightsTest extends Weights implements IWeightsTest {

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

let instance: IWeightsTest;

export function getInstance() {
    if (!instance)
        instance = new WeightsTest();
    return instance;
}

export default { getInstance };
