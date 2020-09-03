import { Mode, State } from './types';
import EventEmitter from 'events';

export interface IClose {
    onClose: (callback: () => void) => void;
    on: (event: CloseEvents, callback: () => void) => void;
    off: (event: string, callback: () => void) => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    doClose: (confirm?: boolean) => void;
    getMode: () => Mode;
}

type CloseEvents = 'stateChange';

export class Close implements IClose {
    private _emitter: EventEmitter;
    private _mode: Mode = Mode.BUTTON;
    private _state: State = State.ENABLED; //State = State.DISABLED;
    private _callbackOnClose?: () => void;

    constructor() {
        this._emitter = new EventEmitter();
    }
    
    onClose(callback: () => void) {
        this._callbackOnClose = callback;
    }

    on(event: CloseEvents, callback: () => void) {
        this._emitter.on(event, callback);
    }

    off(event: string, callback: () => void) {
        this._emitter.off(event, callback);
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
            if (confirm) {
                this._state = State.DISABLED;
                this._onClose();
            } else {
                this._state = State.ENABLED;
            }
            this._mode = Mode.BUTTON;
            this._onStateChange();
            return;
        }

        if (!this.isActive()) return;
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
        this._emitter.emit('stateChange');
    }
}

let instance: Close;

export function getInstance() {
    if (!instance)
        instance = new Close();
    return instance;
}

export default { getInstance };
