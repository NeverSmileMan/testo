import { IKeyboard, Keyboard } from './Keyboard';
import { IInput } from './Input';

export interface ISetActiveInputService {
    
}

export class ActiveInputService {

    private _keyboard: IKeyboard;

    constructor() {
        this._keyboard = new Keyboard();
    }

    setActiveInput(input: IInput | null) {
        this._keyboard.setActiveInput(input);
    }
}

let instance: ActiveInputService;

export function getInstance() {
    if (!instance)
        instance = new ActiveInputService();
    return instance;
}

export default { getInstance };
