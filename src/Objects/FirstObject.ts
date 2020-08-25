import EventEmitter from 'events';

export interface IFirstObject {
    setInput: (value: number) => void;
    getOutput: () => number;
    setCallback: (callback: () => void) => void;
}

class FirstObject implements IFirstObject {
    
    private _input: number;
    private _output: number;
    private _emitter: EventEmitter;

    constructor() {
        this._input = 0;
        this._output = 0;
        this._emitter = new EventEmitter();
    }

    setInput(value: number) {
        this._input = value;
        this._output = this._input;
        this._emitter.emit('changed');
    }

    getOutput() {
        return this._output;
    }

    setCallback(callback: () => void) {
        this._emitter.on('changed', callback);
    }
}

let instance: IFirstObject;

function getInstance() {
    if (!instance) {
        instance = new FirstObject();
    }
    return instance;
}

export default {
    getInstance,
}
