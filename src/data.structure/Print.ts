import { State, Mode } from './types';
import { IOrder } from './Order';

export interface IPrint {
    onPrint: (callback: () => void) => void;
    onStateChange: (callback: () => void) => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    doPrint: (confirm?: boolean) => void;
    getMode: () => Mode;
}

export class Print implements IPrint {
    private _mode: Mode = Mode.BUTTON;
    private _state: State = State.DISABLED;
    private _callbackOnPrint?: () => void;
    private _callbackOnStateChange?: () => void;

    onPrint(callback: () => void) {
        this._callbackOnPrint = callback;
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

    doPrint(confirm?: boolean) {
        if (this._state !== State.ENABLED) return false;

        if (this._mode === Mode.MODAL) {
            this._mode = Mode.BUTTON;
            if (confirm) this._onPrint();
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

    private _onPrint() {
        if (this._callbackOnPrint) this._callbackOnPrint();
    }

    private _onStateChange() {
        if (this._callbackOnStateChange) this._callbackOnStateChange();
    }
}

let instance: Print;

export function getInstance() {
    if (!instance)
        instance = new Print();
    return instance;
}

export default { getInstance };
