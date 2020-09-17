import Weights from '../data.structure/Weights';
import App from '../data.structure/App';
import Keyboard from '../data.structure/Keyboard';
import Message from '../data.structure/Message';
import { MessageCode } from '../data.structure/data/messagesInfo';

function runRikAppControl() {

    const app = App.getInstance();
    const keyboard = Keyboard.getInstance();
    const weights = Weights.getInstance();
    const message = Message.getInstance();

    let weight = '';
    let timer: any;

    window.addEventListener('keydown', (event) => {
        
        // console.log('PRESS:', event.code, event.key);

        if (!event.shiftKey) {
            keyboard.onClick(event.key.toUpperCase());
            return;
        }

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

        if (event.shiftKey && event.code === 'KeyT') app.__changeTheme();
        if (event.shiftKey && event.code === 'KeyZ') { weights.__setStable(); return; }
        if (event.shiftKey && event.code === 'KeyM') {
            message.sendMessage(MessageCode.TEST_RIK_CONTROL);
            setTimeout(() => message.sendMessage(null), 4000);
        }
    });
};

export default { runRikAppControl };
