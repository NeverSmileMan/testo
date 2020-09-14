import { State, EventType } from './types/types';
import EventEmitter from 'events';

export interface IClose {
    onAction: (callback: () => void) => void;
    onChange: (callback: () => void) => void;
    off: (event: EventType, callback: () => void) => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    doAction: (confirm?: boolean) => void;
    getState: () => State;
}

export class Close implements IClose {
    private _emitter: EventEmitter;
    private _state: State = State.DISABLED;
    private _callbackOnClose?: () => void;

    constructor() {
        this._emitter = new EventEmitter();
    }
    
    onAction(callback: () => void) {
        this._callbackOnClose = callback;
    }

    onChange(callback: () => void) {
        this._emitter.on(EventType.STATE_CHANGE, callback);
    }

    off(event: EventType, callback: () => void) {
        this._emitter.off(event, callback);
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
            if (confirm) {
                this._state = State.DISABLED;
                this._onClose();
            } else {
                this._state = State.ENABLED;
            }
            this._onChange();
            return;
        }

        if (!this.isActive()) return;
        this._state = State.PENDING;
        this._onChange();
    }

    getState() {
        return this._state;
    }

    private _onClose() {
        if (this._callbackOnClose) this._callbackOnClose();
    }

    private _onChange() {
        this._emitter.emit(EventType.STATE_CHANGE);
    }
}

let instance: Close;

export function getInstance() {
    if (!instance)
        instance = new Close();
    return instance;
}

export default { getInstance };
