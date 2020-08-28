import { IConfig, config, IEnv } from './Config';
//import { IOrdersControl, OrdersControl } from './OrdersControl';
import { AppStateTypes } from './types';

export interface IAppState {
    onStateChange: (callback: () => void) => void;
    setEnv: (rect: DOMRect) => void;
    getEnv: () => IEnv;
    getStateType: () => AppStateTypes;
}


class AppState implements IAppState {

    private _state: AppStateTypes = AppStateTypes.INIT;
    private _config: IConfig = config;
    private _env: IEnv = {} as IEnv;
    //private _ordersControl: IOrdersControl;
    private _callbackOnStateChange?: () => void;

    constructor() {
        //this._ordersControl = new OrdersControl(config.maxOrdersCount);
    }

    onStateChange(callback: () => void) {
        this._callbackOnStateChange = callback;
    }

    _onStateChange() {
        if (this._callbackOnStateChange) {
            setTimeout(() => this._callbackOnStateChange!(), 3000);
        }
    }

    setEnv(rect: DOMRect) {
        this._env = {
            displayWidth: rect.height,
            displayHeight: rect.width,
        }
        this._state = AppStateTypes.RUN;
        this._onStateChange();
    }

    getEnv() {
        return this._env;
    }

    getStateType() {
        return this._state;
    }
}

let instance: AppState;

export function getInstance() {
    if (!instance)
        instance = new AppState();
    return instance;
}

export default { getInstance };
