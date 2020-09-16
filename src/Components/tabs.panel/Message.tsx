import React, { useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tabs.panel/Message';
import MessageObject from '../../data.structure/Message';
import { IMessageInfo, MessageType } from '../../data.structure/data/messagesInfo';
import { MessageCode } from '../../data.structure/data/messagesInfo';

let setState: React.Dispatch<() => IMessageInfo | null>;
let messageInfo: IMessageInfo | null;
const changeState = (callbacks: Props['callbacks']) => {
    const message = new MessageObject();
    const getState = message.getMessage;
    message.onMessage(() => setState(getState));
    callbacks.onMessage(message.sendMessage);
    return getState();
};

type Props = {
    callbacks: {
        onMessage: (callback: (code: MessageCode | null) => void) => void;
    };
} & WithStyles;

function Message({ classes, callbacks }: Props) {

    [messageInfo, setState] = useState(() => changeState(callbacks));

    const className = `message ${messageInfo?.type === MessageType.ERROR ? 'error' : ''}`;

    return (
        <div className={classes.wrapper}>
            <div className={className}>
                {messageInfo && messageInfo.text}
            </div>
        </div>
    );
}

export default withStyles(styles)(Message);
