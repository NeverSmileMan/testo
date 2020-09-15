import { State } from './types/types';
import { IStateWeights } from './Weights';

export interface IControlButton {
    onAction: (callback?: () => void) => void;
    onChange: (callback: () => void) => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    doAction: (confirm?: boolean) => void;
    getState: () => State;
    onDataChange?: (data: IStateWeights) => void;
}

class ControlButton implements IControlButton {
    protected _state: State = State.DISABLED;
    private _callbackOnAction?: () => void;
    private _callbackOnChange?: () => void;

    onAction(callback?: () => void) {
        this._callbackOnAction = callback;
    }

    onChange(callback: () => void) {
        this._callbackOnChange = callback;
    }

    setActive(value: boolean) {
        if (this._state === State.PENDING) return;
        if (value) this._state = State.ENABLED;
        else this._state = State.DISABLED;
        this._onChange();
    }

    isActive() {
        return this._state === State.ENABLED || false;
    }

    doAction(confirm?: boolean) {
        if (this._state === State.PENDING) {
            this._state = State.ENABLED;
            this._onChange();
            if (confirm) this._onAction();
            return;
        }

        if (!this.isActive()) return;
        this._state = State.PENDING;
        this._onChange();
    }

    getState() {
        return this._state;
    }

    private _onAction() {
        if (this._callbackOnAction) this._callbackOnAction();
    }

    protected _onChange() {
        if (this._callbackOnChange) this._callbackOnChange();
    }
}

export default ControlButton;
