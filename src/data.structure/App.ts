import { IConfig, config, IEnv } from './data/config';
import { IOrdersControl, OrdersControl } from './OrdersControl';
import { AppStateTypes } from './types/types';

export interface IAppState {
    onStateChange: (callback: () => void) => void;
    setEnvironment: (rect: DOMRect) => void;
    getEnvironment: () => IEnv;
    getStateType: () => AppStateTypes;
    getOrdersControlInstance: () => IOrdersControl;
    getConfigPar: (par: keyof IConfig) => IConfig[keyof IConfig];
}

class AppState implements IAppState {

    private _state: AppStateTypes = AppStateTypes.INIT;
    private _config: IConfig = config;
    private _env: IEnv = {} as IEnv;
    private _ordersControl: IOrdersControl;
    private _callbackOnStateChange?: () => void;

    constructor() {
        this._ordersControl = new OrdersControl(config.maxOrdersCount);
    }

    onStateChange(callback: () => void) {
        this._callbackOnStateChange = callback;
    }

    setEnvironment(rect: DOMRect) {
        this._env = {
            displayWidth: rect.height,
            displayHeight: rect.width,
        }
        this._state = AppStateTypes.RUN;
        this._onStateChange();
    }

    getEnvironment() {
        return this._env;
    }

    getStateType() {
        return this._state;
    }

    private _onStateChange() {
        if (this._callbackOnStateChange) {
            setTimeout(() => this._callbackOnStateChange!(), 500);
        }
    }

    getOrdersControlInstance() {
        return this._ordersControl;
    }

    getConfigPar(par: keyof IConfig) {
        return this._config[par];
    }

    __changeTheme() {
        console.log('THEME');
        let themeName = this._config.themeName;
        themeName = themeName === 'default' ? 'silpo' :
            themeName === 'silpo' ? 'fora' :
                'default';
        this._config.themeName = themeName;
        this._onStateChange();
    }
}

let instance: AppState;

export function getInstance() {
    if (!instance)
        instance = new AppState();
    return instance;
}

export default { getInstance };
