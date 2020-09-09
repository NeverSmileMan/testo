import React, { useState } from 'react';
import MessageObject from '../data.structure/Message';
import { IMessageInfo } from '../data.structure/data/messagesInfo';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    'message-wrapper': {
        flex: '1 0 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        width: '100%',
        height: '80%',
        borderRadius: '.4rem',
        fontSize: '.6em',
        border: '1px solid #797979',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // hints_error: {
    //     color: 'white',
    //     background: 'tomato',
    //     animation: '$error 300ms ',
    // },
    // '@keyframes error': {
    //     '0%': {opacity: 0},
    //     '25%': {opacity: 1},
    //     '50%': {opacity: 0},
    //     '75%': {opacity: 1},
    //     '100%': {opacity: 0},
    // },
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
        <div className={classes['message-wrapper']}>
            <div className={classes.message}>
                {messageInfo ? messageInfo.text : 'MESSAGE'}
            </div>
        </div>
    );
}

export default Message;
