import { ThemesNames } from '../themes/themes';
import { IConfig, config, IEnvironment } from './data/config';
import { AppState } from './types/types';

export interface IApp {
    setEnvironment: (rect: DOMRect) => void;
    getEnvironment: () => IEnvironment;
    getState: () => AppState;
    getConfig: () => IConfig;
    onChange: (callback: () => void) => void;
    getStateApp: () => IStateApp;
}

export interface IStateApp {
    state: AppState;
    themeName: ThemesNames;
    maxOrdersCount: number;
    setEnvironment: (rect: DOMRect) => void;
    getStateApp: () => IStateApp;
}

class App implements IApp {

    private _state: AppState = AppState.INIT;
    protected _config: IConfig;
    private _env: IEnvironment = {} as IEnvironment;
    private _callbackOnChange?: () => void;

    constructor() {
        this._config = config;
        this.getStateApp = this.getStateApp.bind(this);
    }

    getStateApp() {
        return {
            state: this.getState(),
            themeName: this.getConfig().themeName,
            maxOrdersCount: this.getConfig().maxOrdersCount,
            setEnvironment: (rect: DOMRect) => this.setEnvironment(rect),
            getStateApp: this.getStateApp,
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

    onChange(callback: () => void) {
        this._callbackOnChange = callback;
    }

    protected _onChange() {
        if (this._callbackOnChange) {
            setTimeout(() => this._callbackOnChange!(), 1000);
        }
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

export default AppTest;
