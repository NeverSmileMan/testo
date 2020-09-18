import Keyboard, { IKeyboard } from './Keyboard';
import { IInput } from './Input';

export interface IActiveInputService {
    setActiveInput: (input: IInput<any, any> | null) => void;
    delActiveInput: (input: IInput<any, any>) => void;
    ifActiveInput: (input: IInput<any, any>) => boolean;
}

class ActiveInputService {

    private _keyboard: IKeyboard;
    private _activeInput: IInput<any, any> | null = null;
    private _inputs: Set<IInput<any, any>> = new Set();

    constructor() {
        this._keyboard = Keyboard.getInstance();
    }

    setActiveInput(input: IInput<any, any> | null) {
        if (input) this._inputs.add(input);
        const currentInput = this._activeInput;
        this._activeInput = input;     
        currentInput?.blurFocus();
        this._keyboard.setActiveInput(input);
        this._activeInput?.setFocus();
    }

    delActiveInput(input: IInput<any, any>) {
        input.blurFocus();
        this._inputs.delete(input);
        const nextInput = this._inputs.values().next().value || null;
        this.setActiveInput(nextInput);
    }

    ifActiveInput(input: IInput<any, any>) {
        return this._activeInput === input;
    }
}

let instance: ActiveInputService;

export function getInstance() {
    if (!instance) {
        instance = new ActiveInputService();
    }
    return instance;
}

export default { getInstance };
