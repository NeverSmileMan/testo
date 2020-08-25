import { Mode, State } from './types';

export interface IClose {
    setActive: (value: boolean) => void;
    doClose: (confirm?: boolean) => void;
    setMode: (mode: Mode) => void;
}

export class Close implements IClose {
    private _active: boolean = false;
    private _mode: Mode = Mode.BUTTON;
    private _state: State = State.DISABLED;
    private _callback: Function;

    constructor(callback: Function) {
        this._callback = callback;
    }

    setActive(value: boolean) {
        if (this._state === State.PENDING) return; //?
        if (value) this._state = State.ENABLED;
        else this._state = State.DISABLED;
    }

    doClose(confirm?: boolean) {
        if (this._mode === Mode.MODAL) {
            if (confirm) this._callback();
            else this._state = State.ENABLED;
        }
        
        this._state = State.PENDING;
        this.setMode(Mode.MODAL);
    }

    setMode(mode: Mode) {
        this._mode = mode;
    }
}
