import Weights, { IWeightsTest } from '../data.structure/Weights';
import { IAppTest } from '../data.structure/App';
import Keyboard from '../data.structure/Keyboard';

const keyboard = Keyboard.getInstance();

(function weightsControl(weights: IWeightsTest) {

    let weight = '';
    let timer: any;

    window.addEventListener('keydown', (event) => {
        
        console.log('PRESS:', event.code, event.key);

        if (event.shiftKey && event.code.match(/Digit/)) {
            weight += event.code.split('Digit')[1];
            weights.__setWeight(+weight / 1000);
            clearTimeout(timer);
            timer = setTimeout(() => {
                weights.__setWeight(+weight / 1000);
                weight = '';
                //timer = null;
            }, 500);
            return;
        }

        if (event.shiftKey && event.code === 'KeyZ') { weights.__setStable(); return; }

        if (event.key.match(/[a-z|а-я|0-9]/))
            keyboard.onClick(event.key.toUpperCase());

    });
})(Weights.getInstance());

export function appControl(app: IAppTest) {
    window.addEventListener('keydown', (event) => {
        if (event.shiftKey && event.code === 'KeyT') app.__changeTheme();
    });
}
