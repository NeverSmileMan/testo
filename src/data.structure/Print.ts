import { State, EventType } from './types/types';
import EventEmitter from 'events';

export interface IPrint {
    onPrint: (callback: () => void) => void;
    onChange: (callback: () => void) => void;
    off: (event: EventType, callback: () => void) => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    doAction: (confirm?: boolean) => void;
    getState: () => State;
}

export class Print implements IPrint {
    private _emitter: EventEmitter;
    private _state: State = State.DISABLED;
    private _callbackOnPrint?: () => void;

    constructor() {
        this._emitter = new EventEmitter();
    }

    onPrint(callback: () => void) {
        this._callbackOnPrint = callback;
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
            this._state = State.ENABLED;
            this._onChange();
            if (confirm) this._onPrint();
            return;
        }

        if (!this.isActive()) return;    
        this._state = State.PENDING;
        this._onChange();
    }

    getState() {
        return this._state;
    }

    private _onPrint() {
        if (this._callbackOnPrint) this._callbackOnPrint();
    }

    private _onChange() {
        this._emitter.emit(EventType.STATE_CHANGE);
    }
}

let instance: Print;

export function getInstance() {
    if (!instance)
        instance = new Print();
    return instance;
}

export default { getInstance };
