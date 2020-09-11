import { IConfig, config, IEnvironment } from './data/config';
import OrdersControl, { IOrdersControl } from './OrdersControl';
import { AppState } from './types/types';

export interface IApp {
    onChange: (callback: () => void) => void;
    setEnvironment: (rect: DOMRect) => void;
    getEnvironment: () => IEnvironment;
    getState: () => AppState;
    getConfig: () => IConfig;
}

class App implements IApp {

    private _state: AppState = AppState.INIT;
    protected _config: IConfig;
    private _env: IEnvironment = {} as IEnvironment;
    private _ordersControl: IOrdersControl;
    private _callbackOnChange?: () => void;

    constructor() {
        this._config = config;
        this._ordersControl = OrdersControl.getInstance(config.maxOrdersCount);
    }

    onChange(callback: () => void) {
        this._callbackOnChange = callback;
    }

    protected _onChange() {
        if (this._callbackOnChange) {
            setTimeout(() => this._callbackOnChange!(), 1000);
        }
    }

    setEnvironment(rect: DOMRect) {
        this._env = {
            displayWidth: rect.height,
            displayHeight: rect.width,
        }
        this._state = AppState.RUN;
        this._onChange();
    }

    getEnvironment() {
        return this._env;
    }

    getState() {
        return this._state;
    }

    getOrdersControlInstance() {
        return this._ordersControl;
    }

    getConfig() {
        return this._config;
    }
}

class AppTest extends App {
    __changeTheme() {
        console.log('THEME');
        let themeName = this._config.themeName;
        themeName = themeName === 'default' ? 'silpo' :
            themeName === 'silpo' ? 'fora' :
                'default';
        this._config.themeName = themeName;
        this._onChange();
    }
}

let instance: App;

export function getInstance() {
    if (!instance)
        instance = new AppTest();
    return instance;
}

export default { getInstance };
