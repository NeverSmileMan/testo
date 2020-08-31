import Weights from './Weights';

class RikApp {

    constructor() {
        this._weights = Weights.getInstance();
    }

    set w(value) {
        this._weights.__setWeight(value)
    }
}

window.rik = new RikApp();
