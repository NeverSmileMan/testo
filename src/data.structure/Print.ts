import { State } from './types';

export interface IPrint {
    doPrint: (data: Object) => boolean;
}

export class Print implements IPrint {
    private _state: State = State.DISABLED;

    doPrint(data: Object) {
        if (this._state === State.DISABLED) return false;
        new Printer(data);
        return true;
    }
}

class Printer {
    constructor(data: Object) {
        console.log(data);
    }
}
