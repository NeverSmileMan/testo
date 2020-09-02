export enum MessageType {
    INFO,
    WARNING,
    ERROR,
}

export enum MessageCode {
    WEIGHTS_IS_EMPTY,
    WEIGHTS_NOT_STABLE,
}

export interface IMessageInfo {
    type: MessageType,
    text: string,
}

const messagesInfo: { [key in MessageCode]: IMessageInfo } = {
    [MessageCode.WEIGHTS_IS_EMPTY]: { type: MessageType.WARNING, text: 'Поставте товар на ваги!' },
    [MessageCode.WEIGHTS_NOT_STABLE]: { type: MessageType.WARNING, text: 'Вага не стабільна!' },
};

export default messagesInfo;
