import {IMessageInfo, MessageCode, MessageType} from '../Message';

const messagesInfo: { [key in MessageCode]: IMessageInfo } = {
    [MessageCode.WEIGHTS_IS_EMPTY]: { type: MessageType.WARNING, text: 'Поставте товар на ваги!' },
    [MessageCode.WEIGHTS_NOT_STABLE]: { type: MessageType.WARNING, text: 'Вага не стабільна!' },
};

export default messagesInfo;
