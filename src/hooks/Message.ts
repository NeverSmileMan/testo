import React, { useState } from 'react';
import MessageObject, { IMessage } from '../data.structure/Message';
import { IMessageInfo } from '../data.structure/data/messagesInfo';
import { Props } from '../components/tabs.panel/Message';

const changeState = (
    message: IMessage,
    setState: React.Dispatch<() => IMessageInfo | null>,
    { onMessage }: Props['callbacks'],
) => {
    const getState = message.getMessage;
    message.onMessage(() => setState(getState));
    onMessage(message.sendMessage);
    return getState();
};

const useMessage = (callbacks: Props['callbacks']) => {
    const message = new MessageObject();
    const [messageInfo, setState] = useState<IMessageInfo | null>(() => null);
    useState(() => changeState(message, setState, callbacks));
    if (!messageInfo) return { type: null, text: '' };
    const { type, text } = messageInfo;
    return { type, text };
};

export default useMessage;
