import App from '../data.structure/App';
import {setTimeout, clearTimeout} from 'timers';

const app = App.getInstance();
const weights = app.getWeightsInstance();

let weight = '';
let timer;

window.addEventListener('keypress', (event) => {
    
    // console.log(event.code);
    
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
