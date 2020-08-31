import Keyboard, { IKeyboard } from './Keyboard';
import { IInput } from './Input';

export interface IActiveInputService {
    setActiveInput: (input: IInput | null) => void;
    delActiveInput: (input: IInput) => void;
}

class ActiveInputService {

    private _keyboard: IKeyboard;
    private _activeInput: IInput | null = null;
    private _defaultInput: IInput | null = null;

    constructor() {
        this._keyboard = Keyboard.getInstance();
    }

    setActiveInput(input: IInput | null) {
        this._activeInput = input;
        this._keyboard.setActiveInput(input);
    }

    delActiveInput(input: IInput) {
        if (this._activeInput !== input) return;
        this.setActiveInput(this._defaultInput);
    }

    setDefaultInput(input: IInput) {
        this._defaultInput = input;
    }
}

let instance: ActiveInputService;

export function getInstance() {
    if (!instance) {
        console.log("NEW SERVICE");
        instance = new ActiveInputService();
    }
    return instance;
}

export default { getInstance };
