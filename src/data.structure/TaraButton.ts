import { IStateWeights } from './Weights';
import { State } from './types/types';
import Input, { IInputNumber } from './Input';
import ControlButton from './ControlButton';

class TaraButton extends ControlButton {
    private _tara: number = 0;
    private _input: IInputNumber;
    private _weights?: IStateWeights;

    constructor() {
        super();
        this._input = Input.getInputNumberInstance();
        this._input.onSelect(this._setAdditionalTara.bind(this));
    }

    private _setState() {
        if (this._state === State.PENDING) return;
        if (this._weights?.isStable)
            this._state = State.ENABLED;
        else
            this._state = State.DISABLED;
    }

    onDataChange(data: IStateWeights) {
        this._weights = data;
        this._setState();
        this._onChange();
    }

    private _setTara(value: number) {
        const currentTara = this._weights?.tara;
        this._weights?.setTara((currentTara || 0) + value);
    }

    private _setAdditionalTara(value: number) {
        this._tara = value / 1000;
        this._input.clearValue();
        this.doAction();
    }

    doAction() {
        if (this._state === State.PENDING) {
            this._state = State.ENABLED;
            this._onChange();                                    
            this._setTara(this._tara);
            return;
        }

        if (!this._weights?.isStable) {
            return;
        }

        if (this._weights.weight !== 0) {
            this._setTara(this._weights?.weight);
            return;
        }

        if (!this.isActive()) return;
        this._state = State.PENDING;
        this._onChange();
        return;
    }

}

export default TaraButton;
