import { State, Mode } from './types/types';
import { IWeights } from './Weights';
import IObject from './types/objects';

export interface IControlButton extends IObject<IStateControlButton>{
    onAction: (callback?: () => void) => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    doAction: (confirm?: boolean) => void;
    getState: () => State;
    setWeights?: (weights: IWeights<any>) => void;
}

export interface IStateControlButton {
    mode: Mode;
    currentIsActive: boolean;
}

class ControlButton implements IControlButton {
    protected _state: State = State.ENABLED;
    private _callbackOnAction?: () => void;
    private _callbackOnChange?: (getState: () => IStateControlButton) => void;

    constructor() {
        this.getStateObject = this.getStateObject.bind(this);
        this.doAction = this.doAction.bind(this);
    }

    getStateObject() {
        return {
            mode: this.getState() === State.PENDING ? Mode.MODAL : Mode.BUTTON,
            currentIsActive: this.isActive(),
        };
    }

    onAction(callback?: () => void) {
        this._callbackOnAction = callback;
    }

    onChange(callback: (getState: () => IStateControlButton) => void) {
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
        if (this._callbackOnChange) this._callbackOnChange(this.getStateObject);
    }
}

export default ControlButton;
