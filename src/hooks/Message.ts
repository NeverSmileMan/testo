import React, { useState } from 'react';
import Message, { IMessage } from '../data.structure/Message';
import { IMessageInfo } from '../data.structure/data/messagesInfo';

const changeState = (
    message: IMessage,
    setState: React.Dispatch<() => IMessageInfo>
) => {
    message.onMessage(setState);
};

const useMessage = () => {
    const [message] = useState(Message.getInstance);
    const [messageInfo, setState] = useState(message.getMessage);
    useState(() => changeState(message, setState));
    if (messageInfo) return messageInfo;
    return { type: null, text: '' };
};

export default useMessage;
