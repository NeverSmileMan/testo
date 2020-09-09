import React, { useState } from 'react';
import MessageObject from '../data.structure/Message';
import { IMessageInfo } from '../data.structure/data/messagesInfo';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    'message': {
        flex: '1 0 0',
        backgroundColor: 'grey',
    },
});

const message = MessageObject.getInstance();

function Message() {
    const classes = useStyle();
    const [, setState] = useState({});

    useState(() => {
        message.onMessage(() => {
            setState({});
        });
    });

    const messageInfo: IMessageInfo | null = message.getMessage();

    return (
        <div className={classes.message}>
            {messageInfo ? messageInfo.text : ''}
        </div>
    );
}

export default Message;
