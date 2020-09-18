import EventEmiter from 'events';
import IObject from './types/objects';

export interface IWeights extends IObject<IStateWeights>{

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
    off: (callback: () => void) => void;
}

export interface IStateWeights {
    isStable: boolean;
    tara: number;
    weight: number;
    sum: number;
}

export class Weights implements IWeights {
    protected _isStable: boolean = true;
    private _tara: number = 0;
    protected _price: number = 0;
    protected _weight: number = 0;
    protected _title: string = '';
    protected _emitter: EventEmiter;

    /* Характеристики вагів: */
    public readonly minWeight: number = 0.04;
    public readonly midweight: number = 6;
    public readonly maxWeight: number = 15;
    public readonly maxTara: number = 6;
    public readonly minWeightResolution: number = 0.002;
    public readonly maxWeightResolution: number = 0.005;

    constructor() {
        this._emitter = new EventEmiter();
        this.getStateObject = this.getStateObject.bind(this);
    }

    getStateObject(): IStateWeights {
        return {
            isStable: this.isStable(),
            tara: this.getTara(),
            weight: this.getWeight(),
            sum: this.getSum(),
        };
    }

    onChange(callback: (getState: () => IStateWeights) => void) {

        this._emitter.on('stateChange', callback);
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

    off(callback: () => void) {
        this._emitter.off('stateChange', callback);
    }

    protected _onChange() {
        this._emitter.emit('stateChange', this.getStateObject);
    }
}

export interface IStateWeightsTest extends IStateWeights {
    price: number;
    title: string;
}

export interface IWeightsTest extends IWeights {
    getStateObject: () => IStateWeightsTest;
    onChange: (callback: (getState: () => IStateWeightsTest) => void) => void;
    __setWeight: (value: number) => void;
    __getPrice: () => number;
    __getTitle: () => string;
    __setStable: (isStable?: boolean) => void;
}

class WeightsTest extends Weights implements IWeightsTest {

    constructor() {
        super();
        this.getStateObject = this.getStateObject.bind(this);
    }
    
    getStateObject() {
        return {
            ...super.getStateObject(),
            price: this.__getPrice(),
            title: this.__getTitle(),
        };
    }

    onChange(callback: (getState: () => IStateWeightsTest) => void) {
        this._emitter.on('stateChange', callback);
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

let instance: IWeightsTest;

function getInstance() {
    if (!instance) {
        instance = new WeightsTest();
    }
    return instance;
}

export default { getInstance };
