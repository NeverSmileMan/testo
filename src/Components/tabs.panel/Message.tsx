import React, { useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tabs.panel/Message';
import MessageObject from '../../data.structure/Message';
import { IMessageInfo, MessageType } from '../../data.structure/data/messagesInfo';

const message = MessageObject.getInstance();

const getState = () => message.getMessage();

let setState: React.Dispatch<() => IMessageInfo | null>;
let messageInfo: IMessageInfo | null;
const changeState = () => {
    message.onMessage(
        () => setState(() => getState())
    );
    return getState();
};

function Message({ classes }: WithStyles) {

    [messageInfo, setState] = useState(changeState);

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
