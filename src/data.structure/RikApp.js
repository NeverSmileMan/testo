import Weights from './Weights';
import App from './App';
import {setTimeout, clearTimeout} from 'timers';

const weights = Weights.getInstance();
const app = App.getInstance();

let weight = '';
let timer;

window.addEventListener('keypress', (event) => {
    //console.log(event.keyCode);
    
    if (event.keyCode >= 48 && event.keyCode <= 57) {
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
    if (event.keyCode === 116) { app.__changeTheme(); return; }
    if (event.keyCode === 122) { weights.__setStable(+event.key); return; }
    
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
