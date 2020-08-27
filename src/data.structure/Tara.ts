import Weights, { IWeights } from './Weights';
import { Mode } from './types';
import { IInputNumber, InputNumber } from './Input';

export interface ITara {
    doTara: () => void;
    setMode: (mode?: Mode) => void;
    isActive: () => boolean;
}

export class Tara implements ITara {

    private _weights: IWeights;
    private _callback?: () => void;
    private _tara: number = 0;
    private _mode: Mode = Mode.BUTTON;
    private _input: IInputNumber;

    constructor(weights: IWeights) {
        this._weights = Weights.getInstance();
        this._weights.setCallback(this.weightsStateChanged.bind(this));
        this._input = new InputNumber();
        this._input.setCallbackOnSelect(this._setAdditionalTara.bind(this))
    }

    weightsStateChanged() {
        if (this._callback) this._callback();
    }

    setCallback(callback: () => void) {
        this._callback = callback;
    }

    setMode(mode?: Mode) {
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

    doTara() {
        if (Mode.MODAL) {
            this._setTara(this._tara);
            this.setMode(Mode.BUTTON);
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
            this.setMode(Mode.MODAL);
            this._input.setFocus();
            return;
        }
    }
}
