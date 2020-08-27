import { State } from './types';
import { IOrder } from './Order';

export interface IPrint {
    setState: (state: State) => void;
    getState: () => State;
    doPrint: (data: IOrder) => void;
    setCallback: (callback: () => void) => void;
}

export class Print implements IPrint {
    private _state: State = State.DISABLED;
    private _callback?: () => void;

    setState(state: State) {
        this._state = state;
    }

    getState() {
        return this._state;
    }

    doPrint(data: Object) {
        if (this._state === State.DISABLED) return false;
        new Printer(data);
        if (this._callback) this._callback();
    }

    setCallback(callback: () => void) {
        this._callback = callback;
    }
}

class Printer {
    constructor(data: Object) {
        console.log(data);
    }
}
