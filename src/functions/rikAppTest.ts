import Weights from '../data.structure/Weights';
import { IAppTest } from '../data.structure/App';
import Keyboard from '../data.structure/Keyboard';

const keyboard = Keyboard.getInstance();
const weights = Weights.getInstance();

function weightsControl() {

    let weight = '';
    let timer: any;

    window.addEventListener('keydown', (event) => {
        
        // console.log('PRESS:', event.code, event.key);

        if (event.shiftKey && event.code.match(/Digit/)) {
            weight += event.code.split('Digit')[1];
            weights.__setWeight(+weight / 1000);
            clearTimeout(timer);
            timer = setTimeout(() => {
                weights.__setWeight(+weight / 1000);
                weight = '';
            }, 500);
            return;
        }

        if (event.shiftKey && event.code === 'KeyZ') { weights.__setStable(); return; }

        if (!event.shiftKey)
            keyboard.onClick(event.key.toUpperCase());

    });
};

export function appControl(app: IAppTest) {
    window.addEventListener('keydown', (event) => {
        if (event.shiftKey && event.code === 'KeyT') app.__changeTheme();
    });
}

weightsControl();
