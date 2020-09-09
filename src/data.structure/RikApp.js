import Weights from './Weights';
import App from './App';

const weights = Weights.getInstance();
const app = App.getInstance();

window.addEventListener('keypress', (event) => {
    if (event.keyCode >= 48 && event.keyCode <= 57) weights.__setWeight(+event.key);
    if (event.keyCode === 116) app.__changeTheme();
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
