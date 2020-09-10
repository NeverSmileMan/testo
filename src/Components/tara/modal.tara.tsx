import React from 'react';
import {makeStyles} from '@material-ui/styles';
import KeyboardTaraFix from '../KeyboardTaraFix';
import Display from './taraCalc/head.input';
import KeyboardTara from '../KeyboardTara';

const useStyles = makeStyles({
    'container': {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        //justifyContent: 'stretch',
        //alignItems: 'stretch',
        width: '50%',
        height: '50%',
        '& .display': {
            height: '30%',
            width: '50%',
            flex: '1 0 30%',
        },
        '& .keyboardTara': {
            height: '70%',
            //width: '50%',
            flex: '1 0 70%',
        },
        '& .keyboardTaraFix': {
            //height: '100%',
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
            <Display />
            <KeyboardTara />
            <KeyboardTaraFix />
        </div>
    );
};

export default ModalTara;
