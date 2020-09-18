import { State } from './types/types';
import { IWeights } from './Weights';
import ControlButton, { IControlButton } from './ControlButton';

export interface ITaraButton extends IControlButton {
    setAdditionalTara: (value: number) => void;
    onWeightsChange: () => void;
}

class TaraButton extends ControlButton implements ITaraButton {
    private _tara: number = 0;
    private _weights?: IWeights<any>;

    constructor() {
        super();
        this.onWeightsChange = this.onWeightsChange.bind(this)
        this.setAdditionalTara = this.setAdditionalTara.bind(this);
    }

    setWeights(weights: IWeights<any>) {
        this._weights = weights;
        this._weights.onChange(this.onWeightsChange);
        console.log('WEIGHTS');
    }

    private _setState() {
        if (this._state === State.PENDING) return;
        if (this._weights?.isStable())
            this._state = State.ENABLED;
        else
            this._state = State.DISABLED;
    }

    onWeightsChange() {
        this._setState();
        this._onChange();
    }

    private _setTara(value: number) {
        const currentTara = this._weights?.getTara() || 0;
        this._weights?.setTara(currentTara + value);
    }

    setAdditionalTara(value: number) {
        this._tara = value;
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
