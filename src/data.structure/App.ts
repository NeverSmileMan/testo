import { IConfig, config, IEnv } from './Config';
import { IOrdersControl, OrdersControl } from './OrdersControl';

class AppState {

    private _config: IConfig;
    private _env: IEnv = {} as IEnv;
    private _ordersControl: IOrdersControl;
    
    constructor() {
        this._config = config;
        this._ordersControl = new OrdersControl(config.maxOrdersCount);
    }

    setEnv() {
        const elem = window.document.body;
        this._env = {
            displayWidth: elem.clientWidth,
            displayHeight: elem.clientHeight,
        }
    }
}

export default AppState;
