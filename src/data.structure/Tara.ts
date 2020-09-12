import Weights, { IWeights } from './Weights';
import { State } from './types/types';
import Input, { IInputNumber } from './Input';
import EventEmitter from 'events';
import ActiveInputService, { IActiveInputService } from './ActiveInputService';

export interface ITara {
    doAction: () => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    getState: () => State;
    onChange: (callback: () => void) => void;
    off: (event: TaraEvents, callback: () => void) => void;
}

type TaraEvents = 'stateChange';

export class Tara implements ITara {
    private _emitter: EventEmitter;
    private _weights: IWeights;
    private _tara: number = 0;
    private _state: State = State.ENABLED; //??
    private _input: IInputNumber;
    private _keyboard: IActiveInputService;

    constructor() {
        this._emitter = new EventEmitter();
        this._weights = Weights.getInstance();
        this._weights.on('stateChange', this._onWeightsStateChange.bind(this));
        this._input = Input.getInputNumberInstance();
        this._input.onSelect(this._setAdditionalTara.bind(this));
        this._keyboard = ActiveInputService.getInstance();
    }

    onChange(callback: () => void) {
        this._emitter.on('stateChange', callback);
    }

    off(event: TaraEvents, callback: () => void) {
        this._emitter.off(event, callback);
    }

    private _onWeightsStateChange() {
        if (this._state === State.PENDING) return;
        if (this._weights.isStable()) {
            this._state = State.ENABLED;
        } else {
            this._state = State.DISABLED;
        }
        this._onStateChange();
    }

    private _setTara(value: number) {
        const currentTara = this._weights.getTara();
        this._weights.setTara(currentTara + value);
    }

    private _setAdditionalTara(value: number) {
        if (!value) {
            this._tara = 0;
            //return;
        }
        this._tara = value / 1000;
        this._input.clearValue();
        this.doAction();
    }

    isActive() {
        return this._state === State.ENABLED || false; //this._weights.isStable();
    }

    setActive(value: boolean) {
        if (this._state === State.PENDING) return;
        if (value) this._state = State.ENABLED;
        else this._state = State.DISABLED;
        this._onStateChange();
    }

    doAction() {
        if (this._state === State.PENDING) {
            this._state = State.ENABLED;
            this._onStateChange();                                    
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
        this._keyboard.setActiveInput(this._input);
        this._onStateChange();
        return;
    }

    getState() {
        return this._state;
    }

    private _onStateChange() {
        this._emitter.emit('stateChange');
    }
}

let instance: ITara;

export function getInstance() {
    if (!instance)
        instance = new Tara();
    return instance;
}

export default { getInstance };
