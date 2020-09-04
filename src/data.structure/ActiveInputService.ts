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
    private _inputs: IInput[] = [];

    constructor() {
        this._keyboard = Keyboard.getInstance();
    }

    setActiveInput(input: IInput | null) {
        if (input) {
            const index = this._inputs.findIndex(i => i === input);
            if (index === -1) this._inputs.push(input);
            console.log(input);
        }
        const currentInput = this._activeInput;
        this._activeInput = input;        
        currentInput?.blurFocus();
        this._keyboard.setActiveInput(input);
        this._activeInput?.setFocus();
    }

    delActiveInput(input: IInput) {
        const index = this._inputs.findIndex(i => i === input);
        if (index > -1) this._inputs.splice(index, 1);
        const nextInput = this._inputs[0] || null;
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
