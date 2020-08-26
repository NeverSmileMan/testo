import { Weights, IWeights } from './Weights';
import { IKeyboard, Keyboard, Languages } from './Keyboard';
import { ITara, Tara } from './Tara';
import { ITab, Tab } from './Tab';
import { IPrint, Print } from './Print';
import { IClose, Close } from './Close';
import { IInput, Input } from './Input';
import { IList, List } from './List';

import { IConfig, config, IEnv } from './Config';


class AppState {
    private _weights: IWeights;
    private _keyboard: IKeyboard;
    private _tara: ITara;
    private _print: IPrint;
    private _close: IClose;
    private _input: IInput;
    private _list: IList;
    private _tabs: Map<number, ITab>;
    private _tabsNums: boolean[];
    private _activeTab: ITab | null= null;
    private _config: IConfig;
    private _env: IEnv = {} as IEnv;

    constructor() {
        this._config = config;
        this.readEnv();
        this._weights = new Weights();
        this._tara = new Tara(this._weights);
        this._keyboard = new Keyboard(this.readKey);
        this._close = new Close(this.closeTab.bind(this));
        this._print = new Print();
        this._list = new List(this._activeTab!.addGood);
        this._input = new Input(this._list.getGoods);
        this._tabs = new Map();
        this._tabsNums = Array(this._config.maxTabCount).fill(true);
        const tab = this.createTab();
        this.changeTab(tab);
    }

    createTab() {
        if (this._tabs.size >= this._config.maxTabCount) return;
        const tabNumber = this._tabsNums.findIndex(item => item);
        const tab: ITab = new Tab(this._weights, this._input, tabNumber);
        this._tabs.set(tabNumber, tab);
        this._tabsNums[tabNumber] = false;
        return tab;
    }

    changeTab(tab?: ITab) {
        
        this._activeTab!.tara = this._weights.getTara();

        if (tab) this._activeTab = tab;
        else if (this._tabs.size) {
            const [firstNumber] = this._tabs.keys();
            this._activeTab = this._tabs.get(firstNumber) as ITab;
        } else {
            this.createTab();
            return;    
        }

        this._weights.setTara(this._activeTab.tara);
        this._close.setActive(true);
    }

    printGoods() {
        this._print.doPrint(this._activeTab!.getGoods());
        this._close.doClose();
    }

    closeTab() {
        const tabNumber = this._activeTab!.tabNumber;
        this._tabs.delete(tabNumber);
        this._tabsNums[tabNumber] = true;
        this.changeTab();
    }

    readEnv() {
        const elem = window.document.body;
        this._env = {
            displayWidth: elem.clientWidth,
            displayHeight: elem.clientHeight,
        }
    }

    readKey(keyCode: number, language: Languages) {
        switch(keyCode) {
            case 0:
                this._input.addSymbol('some symbol');
                break;
            case 1:
                this._input.clearValue();
                break;
            default:
                //...
        }
    }
}

export default AppState;
