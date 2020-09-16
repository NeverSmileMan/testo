import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tabs.panel/Message';
import { MessageType } from '../../data.structure/data/messagesInfo';
import { MessageCode } from '../../data.structure/data/messagesInfo';
import useMessage from '../../hooks/Message';

export type Props = {
    callbacks: {
        onMessage: (callback: (code: MessageCode | null) => void) => void;
    };
} & WithStyles;

function Message({ classes, callbacks }: Props) {
    const { type, text } = useMessage(callbacks);
    const className = `message ${type === MessageType.ERROR ? 'error' : ''}`;
    return (
        <div className={classes.wrapper}>
            <div className={className}>
                {text}
            </div>
        </div>
    );
}

export default withStyles(styles)(Message);
