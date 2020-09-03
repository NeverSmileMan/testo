import Weights, { IWeights } from './Weights';
import { Mode, State } from './types';
import Input, { IInputNumber } from './Input';
import EventEmitter from 'events';

export interface ITara {
    doTara: () => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    getMode: () => Mode;
    on: (event: TaraEvents, callback: () => void) => void;
    off: (event: TaraEvents, callback: () => void) => void;
}

type TaraEvents = 'stateChange';

export class Tara implements ITara {
    private _emitter: EventEmitter;
    private _weights: IWeights;
    private _tara: number = 0;
    private _mode: Mode = Mode.BUTTON;
    private _state: State = State.ENABLED; //State = State.DISABLED;
    private _input: IInputNumber;

    constructor() {
        this._emitter = new EventEmitter();
        this._weights = Weights.getInstance();
        this._weights.on('stateChange', this._onWeightsStateChange.bind(this));
        this._input = Input.getInputNumberInstance();
        this._input.setCallbackOnSelect(this._setAdditionalTara.bind(this));
    }

    on(event: TaraEvents, callback: () => void) {
        this._emitter.on(event, callback);
    }

    off(event: TaraEvents, callback: () => void) {
        this._emitter.off(event, callback);
    }

    private _onWeightsStateChange() {
        if (this._mode !== Mode.BUTTON) return;
        if (this._weights.isStable()) {
            this._state = State.ENABLED;
        } else {
            this._state = State.DISABLED;
        }
        this._onStateChange();
    }

    // private _setMode(mode?: Mode) {
    //     if (mode) this._mode = mode;
    //     else if (this._mode = Mode.BUTTON) this._mode = Mode.MODAL;
    //     else this._mode = Mode.BUTTON;
    // }

    private _setTara(value: number) {
        const currentTara = this._weights.getTara();
        this._weights.setTara(currentTara + value);
    }

    private _setAdditionalTara(value: number) {
        if (!value) {
            this._tara = 0;
            return;
        }
        this._tara = value;
        this._input.clearValue();
        this.doTara();
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

    doTara() {
        if (this._mode === Mode.MODAL) {
            this._state = State.ENABLED;
            this._mode = Mode.BUTTON;
            this._input.delFocus();
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
        //this._input.clearValue(); 
        this._mode = Mode.MODAL;
        this._state = State.PENDING;
        this._onStateChange();
        this._input.setFocus();
        return;
    }

    getMode() {
        return this._mode;
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
