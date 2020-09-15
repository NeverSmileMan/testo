import Weights, { IWeightsTest } from '../data.structure/Weights';
import { IAppTest } from '../data.structure/App';
 
(function weightsControl(weights: IWeightsTest) {

    let weight = '';
    let timer: any;

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

        if (event.code === 'KeyZ') { weights.__setStable(); return; }
    });
})(Weights.getInstance());

export function appControl(app: IAppTest) {
    window.addEventListener('keypress', (event) => {
        if (event.code === 'KeyT') app.__changeTheme();
    });
}
