import FirstObject, { IFirstObject } from './FirstObject';
import SecondObject, { ISecondObject } from './SecondObject';

export interface IStateObject {}

class StateObject implements IStateObject {
    private _firstObject: IFirstObject;
    private _secondObject: ISecondObject;

    constructor() {
        this._firstObject = FirstObject.getInstance();
        this._secondObject = SecondObject.getInstance();

        this._firstObject.setCallback(
            () => {
                if (this._firstObject.getOutput() === this._secondObject.getOutput())
                    return;
                this._secondObject.setInput(this._firstObject.getOutput());
            }
        );

        this._secondObject.setCallback( 
            () => {
                if (this._firstObject.getOutput() === this._secondObject.getOutput())
                    return;
                this._firstObject.setInput(this._secondObject.getOutput());
            }
        );
    }
}

let instance: IStateObject;

function getInstance() {
    if (!instance) {
        instance = new StateObject();
    }
    return instance;
}

export default {
    getInstance,
}
