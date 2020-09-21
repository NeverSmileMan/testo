import
    messagesInfo, {
    IMessageInfo,
    MessageCode,
    MessageType,
} from './messagesInfo';

export interface IMessage {
    sendMessage: (code: MessageCode, text?: string) => void;
    getMessage: () => IMessageInfo;
    onMessage: (callback: (getState: () => IMessageInfo) => void) => void;
}

export class Message implements IMessage {
    private _code: MessageCode = MessageCode.CLEAR_MESSAGE;
    private _callbackOnMessage?: (getState: () => IMessageInfo) => void;
    private _text: string = '';
    private _timer: any;
    constructor() {
        this.getMessage = this.getMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(code: MessageCode, text?: string) {
        clearTimeout(this._timer);
        const prevCode = this._code;
        const prevText = this._text;
        this._code = code;
        this._text = (code && text) || '';
        this._onMessage();
        if (code === null
            || messagesInfo[code].type !== MessageType.ERROR) return;

        this._timer = setTimeout(() => {
            this._code = prevCode;
            this._text = prevText;
            this._onMessage();
        }, 2000);
    }

    onMessage(callback: (getState: () => IMessageInfo) => void) {
        this._callbackOnMessage = callback;
    }

    private _onMessage() {
        if (this._callbackOnMessage)
            this._callbackOnMessage(this.getMessage);
    }

    getMessage() {
        if (this._code === null) return messagesInfo[MessageCode.CLEAR_MESSAGE];
        const message = { ...messagesInfo[this._code] };
        if (this._text) message.text += ': ' + this._text;
        return message;
    }
}

let instance: IMessage;

function getInstance() {
    if (!instance) {
        instance = new Message();
    }
    return instance;
}

export default { getInstance };

export * from './messagesInfo';
