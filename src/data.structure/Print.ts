import { State, Mode } from './types';
import EventEmitter from 'events';

export interface IPrint {
    onPrint: (callback: () => void) => void;
    on: (event: PrintEvents, callback: () => void) => void;
    off: (event: string, callback: () => void) => void;
    setActive: (value: boolean) => void;
    isActive: () => boolean;
    doPrint: (confirm?: boolean) => void;
    getMode: () => Mode;
}

type PrintEvents = 'stateChange';

export class Print implements IPrint {
    private _emitter: EventEmitter;
    private _mode: Mode = Mode.BUTTON;
    private _state: State = State.ENABLED; //State.DISABLED;
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

    doPrint(confirm?: boolean) {
        if (this._mode === Mode.MODAL) {
            if (confirm) {
                this._onPrint();
                this._state = State.DISABLED;
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
