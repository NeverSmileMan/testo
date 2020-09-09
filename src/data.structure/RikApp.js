import Weights from './Weights';

const weights = Weights.getInstance();

window.addEventListener('keypress', (event) => {
    if (event.keyCode >= 48 && event.keyCode <= 57) weights.__setWeight(+event.key);
    //console.log(event.keyCode);
});

// class RikApp {

//     constructor() {
//         this._weights = Weights.getInstance();
//     }

//     set w(value) {
//         this._weights.__setWeight(value)
//     }
// }

// window.rik = new RikApp();
