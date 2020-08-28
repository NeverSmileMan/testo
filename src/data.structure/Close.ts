import { Mode, State } from './types';

export interface IClose {
    onClose: (callback: () => void) => void;
    onStateChange: (callback: () => void) => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    doClose: (confirm?: boolean) => void;
    getMode: () => Mode;
}

export class Close implements IClose {
    private _mode: Mode = Mode.BUTTON;
    private _state: State = State.ENABLED; //State = State.DISABLED;
    private _callbackOnClose?: () => void;
    private _callbackOnStateChange?: () => void;

    onClose(callback: () => void) {
        this._callbackOnClose = callback;
    }

    onStateChange(callback: () => void) {
        this._callbackOnStateChange = callback;
    }

    setActive(value: boolean) {
        if (this._state === State.PENDING) return;
        if (value) this._state = State.ENABLED;
        else this._state = State.DISABLED;
        this._onStateChange();
    }

    isActive() {
        return this._state === State.ENABLED || false;
    }

    doClose(confirm?: boolean) {
        if (this._mode === Mode.MODAL) {
            this._mode = Mode.BUTTON;
            if (confirm) this._onClose();
            this._state = State.ENABLED;
            this._onStateChange();
            return;
        }

        this._mode = Mode.MODAL;      
        this._state = State.PENDING;
        this._onStateChange();
    }

    getMode() {
        return this._mode;
    }

    private _onClose() {
        if (this._callbackOnClose) this._callbackOnClose();
    }

    private _onStateChange() {
        if (this._callbackOnStateChange) {
            this._callbackOnStateChange();
        }
    }
}

let instance: Close;

export function getInstance() {
    if (!instance)
        instance = new Close();
    return instance;
}

export default { getInstance };
