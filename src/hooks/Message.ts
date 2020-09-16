import React, { useState } from 'react';
import MessageObject from '../data.structure/Message';
import { IMessageInfo } from '../data.structure/data/messagesInfo';

const message = MessageObject.getInstance();

const changeState = (setState: React.Dispatch<() => IMessageInfo | null>) => {
    const getState = message.getMessage;
    message.onMessage(() => setState(getState));
};

const useMessage = () => {
    const [messageInfo, setState] = useState<IMessageInfo | null>(message.getMessage);
    useState(() => changeState(setState));
    if (messageInfo) return messageInfo;
    return { type: null, text: '' };
};

export default useMessage;
