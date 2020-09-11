import { State } from './types/types';
import EventEmitter from 'events';

export interface IClose {
    onClose: (callback: () => void) => void;
    on: (event: CloseEvents, callback: () => void) => void;
    off: (event: CloseEvents, callback: () => void) => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    doClose: (confirm?: boolean) => void;
    do: (confirm?: boolean) => void;
    getState: () => State;
}

type CloseEvents = 'stateChange';

export class Close implements IClose {
    private _emitter: EventEmitter;
    private _state: State = State.DISABLED;
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

    off(event: CloseEvents, callback: () => void) {
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

    do(confirm?: boolean) {
        this.doClose(confirm);
    }

    doClose(confirm?: boolean) {
        if (this._state === State.PENDING) {
            if (confirm) {
                this._state = State.DISABLED;
                this._onClose();
            } else {
                this._state = State.ENABLED;
            }
            this._onStateChange();
            return;
        }

        if (!this.isActive()) return;
        this._state = State.PENDING;
        this._onStateChange();
    }

    getState() {
        return this._state;
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
