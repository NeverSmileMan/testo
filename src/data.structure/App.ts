import { ThemesNames } from '../themes/themes';
import { IConfig, config, IEnvironment } from './data/config';
import { AppState } from './types/types';
import IObject from './types/objects';

export interface IApp extends IObject<IStateApp>{
    setEnvironment: (rect: DOMRect) => void;
    getEnvironment: () => IEnvironment;
    getState: () => AppState;
    getConfig: () => IConfig;
}

export interface IStateApp {
    state: AppState;
    themeName: ThemesNames;
    maxOrdersCount: number;
    setEnvironment: (rect: DOMRect) => void;
}

class App implements IApp {
    private _state: AppState = AppState.INIT;
    protected _config: IConfig;
    private _env: IEnvironment = {} as IEnvironment;
    private _callbackOnChange?: (getState: () => IStateApp) => void;

    constructor() {
        this._config = config;
        this.getStateObject = this.getStateObject.bind(this);
    }

    getStateObject() {
        return {
            state: this.getState(),
            themeName: this.getConfig().themeName,
            maxOrdersCount: this.getConfig().maxOrdersCount,
            setEnvironment: (rect: DOMRect) => this.setEnvironment(rect),
        };
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

    onChange(callback: (getState: () => IStateApp) => void) {
        this._callbackOnChange = callback;
    }

    protected _onChange() {
        this._callbackOnChange &&
            setTimeout(
                () => this._callbackOnChange!(this.getStateObject), 1000);
    }
}

export interface IAppTest extends IApp {
    __changeTheme: () => void;
}

class AppTest extends App implements IAppTest {
    __changeTheme() {
        let themeName = this._config.themeName;
        themeName = themeName === 'default' ? 'silpo' :
            themeName === 'silpo' ? 'fora' :
                'default';
        this._config.themeName = themeName;
        this._onChange();
    }
}

let instance: AppTest;

function getInstance() {
    if (!instance) {
        instance = new AppTest();
    }
    return instance;
}

export default { getInstance };
