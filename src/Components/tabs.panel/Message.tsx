import React, { useState } from 'react';
import MessageObject from '../../data.structure/Message';
import { IMessageInfo, MessageType } from '../../data.structure/data/messagesInfo';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyle = makeStyles((theme: Theme) => ({
    'message-wrapper': {
        flex: '1 0 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: '0.5rem',
    },
    'message': {
        flex: '1 0 0',
        borderRadius: '.4rem',
        fontSize: '0.8rem',
        border: '1px solid grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    'error': {
        color: 'white',
        background: theme.palette.primary.main,
        animation: '$error 300ms ',
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

function Message() {
    const classes = useStyle();
    const [, setState] = useState({});

    useState(() => {
        message.onMessage(() => {
            setState({});
        });
    });

    const messageInfo: IMessageInfo | null = message.getMessage();

    const className = classes.message + ' ' + (messageInfo?.type === MessageType.ERROR ? classes.error : '');

    return (
        <div className={classes['message-wrapper']}>
            <div className={className}>
                {messageInfo ? messageInfo.text : ''}
            </div>
        </div>
    );
}

export default Message;
