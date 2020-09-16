import { IStateWeights } from './Weights';
import { State } from './types/types';
import Weights, { IWeightsTest } from './Weights';
import Input, { IInputNumber } from './Input';
import ControlButton from './ControlButton';

class TaraButton extends ControlButton {
    private _tara: number = 0;
    private _input: IInputNumber;
    private _weights: IWeightsTest;

    constructor() {
        super();
        this._weights = Weights.getInstance();
        this._weights.onChange(this._onWeightsChange.bind(this));
        this._onWeightsChange();
        this._input = Input.getInputNumberInstance();
        this._input.onSelect(this._setAdditionalTara.bind(this));
    }

    private _setState() {
        if (this._state === State.PENDING) return;
        if (this._weights.isStable())
            this._state = State.ENABLED;
        else
            this._state = State.DISABLED;
    }

    onDataChange(data: IStateWeights) {
        // this._weights = data;
        // this._setState();
        // this._onChange();
    }

    private _onWeightsChange() {
        this._setState();
        this._onChange();
    }

    private _setTara(value: number) {
        const currentTara = this._weights.getTara();
        this._weights.setTara(currentTara + value);
    }

    private _setAdditionalTara(value: number) {
        this._tara = value / 1000;
        this._input.setValue('');
        this.doAction();
    }

    doAction() {
        if (this._state === State.PENDING) {
            this._state = State.ENABLED;
            this._onChange();                                    
            this._setTara(this._tara);
            return;
        }

        if (!this._weights.isStable) {
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

}

export default TaraButton;
