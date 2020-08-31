import Weights, { IWeights } from './Weights';
import { Mode, State } from './types';
import { IInputNumber, InputNumber } from './Input';

export interface ITara {
    doTara: () => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    getMode: () => Mode;
    onStateChange: (callback: () => void) => void;
}

export class Tara implements ITara {

    private _weights: IWeights;
    private _callbackOnStateChange?: () => void;
    private _tara: number = 0;
    private _mode: Mode = Mode.BUTTON;
    private _state: State = State.ENABLED; //State = State.DISABLED;
    private _input: IInputNumber;

    constructor() {
        this._weights = Weights.getInstance();
        this._weights.on('stateChange', this._onWeightsStateChange.bind(this));
        this._input = new InputNumber();
        this._input.setCallbackOnSelect(this._setAdditionalTara.bind(this))
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

    onStateChange(callback: () => void) {
        this._callbackOnStateChange = callback;
    }

    private _setMode(mode?: Mode) {
        if (mode) this._mode = mode;
        else if (this._mode = Mode.BUTTON) this._mode = Mode.MODAL;
        else this._mode = Mode.BUTTON;
    }

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
        this.doTara();
    }

    isActive() {
        return this._weights.isStable();
    }

    setActive(value: boolean) {
        if (this._state === State.PENDING) return;
        if (value) this._state = State.ENABLED;
        else this._state = State.DISABLED;
        this._onStateChange();
    }

    doTara() {
        if (Mode.MODAL) {
            this._setTara(this._tara);
            this._setMode(Mode.BUTTON);
            this._input.delFocus();
            return;
        }

        if (!this._weights.isStable()) {
            return;
        }

        if (this._weights.getWeight() !== 0) {
            this._setTara(this._weights.getWeight());
            return;
        }

        if (Mode.BUTTON) {
            this._setMode(Mode.MODAL);
            this._input.setFocus();
            return;
        }
    }

    getMode() {
        return this._mode;
    }

    private _onStateChange() {
        if (this._callbackOnStateChange) this._callbackOnStateChange();
    }
}

let instance: ITara;

export function getInstance() {
    if (!instance)
        instance = new Tara();
    return instance;
}

export default { getInstance };
