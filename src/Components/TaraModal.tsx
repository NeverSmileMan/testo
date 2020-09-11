import React from 'react';
import {makeStyles} from '@material-ui/styles';
import KeyboardTaraFix from './KeyboardTaraFix';
import TaraDisplay from './TaraDisplay';
import KeyboardTara from './KeyboardTara';

const useStyles = makeStyles({
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

const ModalTara = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <TaraDisplay containerClassName='display'/>
            <KeyboardTara containerClassName='keyboardTara'/>
            <KeyboardTaraFix containerClassName='keyboardTaraFix'/>
        </div>
    );
};

export default ModalTara;
