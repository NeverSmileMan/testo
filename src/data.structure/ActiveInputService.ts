import Keyboard, { IKeyboard } from './Keyboard';
import { IInput } from './Input';

export interface IActiveInputService {
    setActiveInput: (input: IInput | null) => void;
    delActiveInput: (input: IInput) => void;
    ifActiveInput: (input: IInput) => boolean;
}

class ActiveInputService {

    private _keyboard: IKeyboard;
    private _activeInput: IInput | null = null;
    private _inputs: Set<IInput> = new Set();

    constructor() {
        this._keyboard = Keyboard.getInstance();
    }

    setActiveInput(input: IInput | null) {
        if (input) this._inputs.add(input);
        const currentInput = this._activeInput;
        this._activeInput = input;       
        currentInput?.blurFocus();
        this._keyboard.setActiveInput(input);
        this._activeInput?.setFocus();
    }

    delActiveInput(input: IInput) {
        this._inputs.delete(input);
        const nextInput = this._inputs.values().next().value || null;
        this.setActiveInput(nextInput);
    }

    ifActiveInput(input: IInput) {
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
