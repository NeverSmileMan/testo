import { IKeyboard, Keyboard, Languages } from './Keyboard';
import { IInput, Input } from './Input';

export interface ISetActiveInputService {
    
}

export class setActiveInputService {

    private _keyboard: IKeyboard;
    private _input: IInput;

    constructor() {
        this._keyboard = new Keyboard();
        this._input = new Input();        
        this._keyboard.setActiveInput(this._input);
    }
}

export default Select;
