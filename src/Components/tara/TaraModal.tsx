import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import TaraDisplay from './TaraDisplay';
import KeyboardTara from './KeyboardTara';
import KeyboardTaraFix from './KeyboardTaraFix';

const styles = createStyles({
    'container': {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '50%',
        height: '50%',
        '& .display': {
            height: '30%',
            width: '50%',
            flex: '1 0 30%',
        },
        '& .keyboardTara': {
            height: '70%',
            flex: '1 0 70%',
        },
        '& .keyboardTaraFix': {
            width: '50%',
            flex: '1 0 100%',
            marginLeft: '0.3rem',
        },
    },
});

function TaraModal ({ classes }: WithStyles) {
    return (
        <div className={classes.container}>
            <TaraDisplay containerClassName='display'/>
            <KeyboardTara containerClassName='keyboardTara'/>
            <KeyboardTaraFix containerClassName='keyboardTaraFix'/>
        </div>
    );
};

export default TaraModal;
