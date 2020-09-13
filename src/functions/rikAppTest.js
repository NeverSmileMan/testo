import Weights from '../data.structure/Weights';
import App from '../data.structure/App';
import {setTimeout, clearTimeout} from 'timers';

const weights = Weights.getInstance();
const app = App.getInstance();

let weight = '';
let timer;

window.addEventListener('keypress', (event) => {
    console.log(event.code);
    
    if (event.code.match(/Digit/)) {
        clearTimeout(timer);
        weight += event.key;
        weights.__setWeight(+weight / 1000);
        timer = setTimeout(() => {
            weights.__setWeight(+weight / 1000);
            weight = '';
            timer = null;
        }, 500);
        return;
    }
    if (event.code === 'KeyT') { app.__changeTheme(); return; }
    if (event.code === 'KeyZ') { weights.__setStable(); return; }
    
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
