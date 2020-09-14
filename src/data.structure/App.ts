import { IConfig, config, IEnvironment } from './data/config';
import OrdersControl from './OrdersControlNew';
import { AppState } from './types/types';

export interface IApp {
    setEnvironment: (rect: DOMRect) => void;
    getEnvironment: () => IEnvironment;
    getState: () => AppState;
    getConfig: () => IConfig;
    onChange: (callback: () => void) => void;
}

class App implements IApp {

    private _state: AppState = AppState.INIT;
    protected _config: IConfig;
    private _env: IEnvironment = {} as IEnvironment;
    private _callbackOnChange?: () => void;

    constructor() {
        this._config = config;
        OrdersControl.getInstance(config.maxOrdersCount);
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

    getConfig() {
        return this._config;
    }

    onChange(callback: () => void) {
        this._callbackOnChange = callback;
    }

    protected _onChange() {
        if (this._callbackOnChange) {
            setTimeout(() => this._callbackOnChange!(), 1000);
        }
    }
}

interface IAppTest extends IApp {
    __changeTheme: () => void;
}

class AppTest extends App implements IAppTest {
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

let instance: IAppTest;

export function getInstance() {
    if (!instance) {
        instance = new AppTest();
    }
    return instance;
}

export default { getInstance };
