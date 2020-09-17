import Keyboard, { IKeyboard } from './Keyboard';
import { IInputBase } from './Input';

export interface IActiveInputService {
    setActiveInput: (input: IInputBase<any> | null) => void;
    delActiveInput: (input: IInputBase<any>) => void;
    ifActiveInput: (input: IInputBase<any>) => boolean;
}

class ActiveInputService {

    private _keyboard: IKeyboard;
    private _activeInput: IInputBase<any> | null = null;
    private _inputs: Set<IInputBase<any>> = new Set();

    constructor() {
        this._keyboard = Keyboard.getInstance();
    }

    setActiveInput(input: IInputBase<any> | null) {
        if (input) this._inputs.add(input);
        const currentInput = this._activeInput;
        this._activeInput = input;     
        currentInput?.blurFocus();
        this._keyboard.setActiveInput(input);
        this._activeInput?.setFocus();
    }

    delActiveInput(input: IInputBase<any>) {
        input.blurFocus();
        this._inputs.delete(input);
        const nextInput = this._inputs.values().next().value || null;
        this.setActiveInput(nextInput);
    }

    ifActiveInput(input: IInputBase<any>) {
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
