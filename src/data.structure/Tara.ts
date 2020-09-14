import Weights, { IWeights } from './Weights';
import { State, EventType } from './types/types';
import Input, { IInputNumber } from './Input';
import EventEmitter from 'events';

export interface ITara {
    doAction: () => void;
    onAction: () => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    getState: () => State;
    onChange: (callback: () => void) => void;
    off: (event: EventType, callback: () => void) => void;
}

export class Tara implements ITara {
    private _emitter: EventEmitter;
    private _weights: IWeights;
    private _tara: number = 0;
    private _state: State = State.DISABLED;
    private _input: IInputNumber;

    constructor() {
        this._emitter = new EventEmitter();
        this._weights = Weights.getInstance();
        this._weights.onChange(this._onWeightsStateChange.bind(this));
        this._onWeightsStateChange();
        this._input = Input.getInputNumberInstance();
        this._input.onSelect(this._setAdditionalTara.bind(this));

    }

    onAction() {
        return;
    }

    onChange(callback: () => void) {
        this._emitter.on(EventType.STATE_CHANGE, callback);
    }

    off(event: EventType, callback: () => void) {
        this._emitter.off(event, callback);
    }

    private _setState() {
        if (this._state === State.PENDING) return;
        if (this._weights.isStable())
            this._state = State.ENABLED;
        else
            this._state = State.DISABLED;
    }

    private _onWeightsStateChange() { 
        this._setState();
        this._onChange();
    }

    private _setTara(value: number) {
        const currentTara = this._weights.getTara();
        this._weights.setTara(currentTara + value);
    }

    private _setAdditionalTara(value: number) {
        this._tara = value / 1000;
        this._input.clearValue();
        this.doAction();
    }

    isActive() {
        return this._state === State.ENABLED || false;
    }

    setActive(value: boolean) {
        if (this._state === State.PENDING) return;
        if (value) this._state = State.ENABLED;
        else this._state = State.DISABLED;
        this._onChange();
    }

    doAction() {
        if (this._state === State.PENDING) {
            this._state = State.ENABLED;
            this._onChange();                                    
            this._setTara(this._tara);
            return;
        }

        if (!this._weights.isStable()) {
            return;
        }

        if (this._weights.getWeight() !== 0) {
            this._setTara(this._weights.getWeight());
            return;
        }

        if (!this.isActive()) return;
        this._state = State.PENDING;
        this._onChange();
        return;
    }

    getState() {
        return this._state;
    }

    private _onChange() {
        this._emitter.emit(EventType.STATE_CHANGE);
    }
}

let instance: ITara;

export function getInstance() {
    if (!instance)
        instance = new Tara();
    return instance;
}

export default { getInstance };
