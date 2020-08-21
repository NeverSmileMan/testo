import { IWeights } from './Weights';
import { Mode } from './types';

export interface ITara {
    doTara: () => void;
    setMode: (mode?: Mode) => void;
    setTara: (value: number) => void;
    setAdditionalTara: (value: number) => void;
    isBlock: () => boolean;
}

export class Tara implements ITara {

    private _weights: IWeights;
    private _tara: number;
    private _mode: Mode = Mode.BUTTON;

    constructor(weights: IWeights) {
        this._weights = weights;
    }

    setMode(mode?: Mode) {
        if (mode) this._mode = mode;
        else if (this._mode = Mode.BUTTON) this._mode = Mode.MODAL;
        this._mode = Mode.BUTTON;
    }

    setTara(value: number) {
        let tara = this._weights.getTara();
        if (value) {
            tara += value;
        } else {
            tara = tara + this._weights.getWeight();
        }
        this._weights.setTara(tara);
    }

    setAdditionalTara(value: number) {
        this._tara = value;
    }

    isBlock() {
        return !this._weights.isStable();
    }    

    doTara() {
        if (Mode.MODAL) {
            this.setTara(this._tara);
            return;
        }

        if (!this._weights.isStable()) {
            return;
        }

        if (this._weights.getWeight() === 0) {
            this.setTara(0);
            return;
        }

        if (Mode.BUTTON) {
            this.setMode(Mode.MODAL);
            return;
        }
    }
}
