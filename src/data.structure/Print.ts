import { State } from './types';
import EventEmitter from 'events';

export interface IPrint {
    onPrint: (callback: () => void) => void;
    on: (event: PrintEvents, callback: () => void) => void;
    off: (event: PrintEvents, callback: () => void) => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    doPrint: (confirm?: boolean) => void;
    getState: () => State;
}

type PrintEvents = 'stateChange';

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

    on(event: PrintEvents, callback: () => void) {
        this._emitter.on(event, callback);
    }

    off(event: PrintEvents, callback: () => void) {
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

    doPrint(confirm?: boolean) {
        if (this._state === State.PENDING) {
            this._state = State.ENABLED;
            this._onStateChange();
            if (confirm) this._onPrint();
            return;
        }

        if (!this.isActive()) return;    
        this._state = State.PENDING;
        this._onStateChange();
    }

    getState() {
        return this._state;
    }

    private _onPrint() {
        if (this._callbackOnPrint) this._callbackOnPrint();
    }

    private _onStateChange() {
        this._emitter.emit('stateChange');
    }
}

let instance: Print;

export function getInstance() {
    if (!instance)
        instance = new Print();
    return instance;
}

export default { getInstance };
