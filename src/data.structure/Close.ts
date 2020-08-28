import { Mode, State } from './types';

export interface IClose {
    onClose: (callback: () => void) => void;
    onStateChange: (callback: () => void) => void;
    setActive: (value: boolean) => void;
    doClose: (confirm?: boolean) => void;
}

export class Close implements IClose {
    private _mode: Mode = Mode.BUTTON;
    private _state: State = State.DISABLED;
    private _callbackOnClose?: () => void;
    private _callbackOnStateChange?: () => void;

    onClose(callback: () => void) {
        this._callbackOnClose = callback;
    }

    setActive(value: boolean) {
        if (this._state === State.PENDING) return;
        if (value) this._state = State.ENABLED;
        else this._state = State.DISABLED;
        if (this._callbackOnStateChange) this._callbackOnStateChange();
    }

    onStateChange(callback: () => void) {
        this._callbackOnStateChange = callback;
    }

    doClose(confirm?: boolean) {
        if (this._mode === Mode.MODAL) {
            this._mode = Mode.BUTTON;
            this._state = State.ENABLED;
            if (this._callbackOnStateChange) this._callbackOnStateChange();
            if (!confirm) return;
            if (this._callbackOnClose) this._callbackOnClose();
            return;
        }

        this._mode = Mode.MODAL;      
        this._state = State.PENDING;
        if (this._callbackOnStateChange) this._callbackOnStateChange();
    }
}
