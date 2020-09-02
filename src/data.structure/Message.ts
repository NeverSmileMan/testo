import messagesInfo, { IMessageInfo, MessageCode, MessageType } from './data/messagesInfo';

export interface IMessage {
    sendMessage: (code: MessageCode | null) => void;
    onMessage: (callback: () => void) => void;
    getMessage: () => IMessageInfo | null;
}

export class Message implements IMessage {
    private _code: MessageCode | null = null;
    private _callbackOnMessage?: () => void;

    sendMessage(code: MessageCode | null) {
        this._code = code;
        this._onMessage();
    }

    onMessage(callback: () => void) {
        this._callbackOnMessage = callback;
    }

    private _onMessage() {
        if (this._callbackOnMessage) this._callbackOnMessage();
    }

    getMessage() {
        if (this._code === null) return null
        return messagesInfo[this._code];
    }
}

let instance: IMessage;

export function getInstance() {
    if (!instance) {
        instance = new Message();
    }
    return instance;
}

export default { getInstance };
