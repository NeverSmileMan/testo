import React, { useState } from 'react';
import MessageObject from '../data.structure/Message';
import { IMessageInfo } from '../data.structure/data/messagesInfo';

const message = MessageObject.getInstance();

function Message() {
    const [, setState] = useState({});

    useState(() => {
        message.onMessage(() => {
            setState({});
        });
    });

    const messageInfo: IMessageInfo | null = message.getMessage();

    return (
        <div className='message'>
            {messageInfo ? messageInfo.text : ''}
        </div>
    );
}

export default Message;
