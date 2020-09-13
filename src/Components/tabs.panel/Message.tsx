import React, { useState } from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles } from '@material-ui/core/styles';
import MessageObject from '../../data.structure/Message';
import { IMessageInfo, MessageType } from '../../data.structure/data/messagesInfo';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        flex: '1 0 0',
        padding: '0.5rem',
        '& .message': {
            height: '100%',
            borderRadius: '.4rem',
            fontSize: '0.8rem',
            border: '1px solid ' + theme.palette.secondary.dark,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        '& .error': {
            color: 'white',
            background: theme.palette.primary.main,
            animation: '$error 300ms',
        },
    },
    '@keyframes error': {
        '0%': {opacity: 0},
        '25%': {opacity: 1},
        '50%': {opacity: 0},
        '75%': {opacity: 1},
        '100%': {opacity: 0},
    },
}));

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
