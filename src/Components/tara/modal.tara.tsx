import React from 'react';
import {makeStyles} from '@material-ui/styles';
import InputWeight from './taraCalc/input.weight';
import KeyboardTaraFix from '../KeyboardTaraFix';

const useStyles = makeStyles({
    'conteiner': {
        display: 'flex',
        width: '50%',
    },
});

const ModalTara = () => {
    const classes = useStyles();
    return (
        <div className={classes.conteiner}>
            <InputWeight/>
            <KeyboardTaraFix />
        </div>
    );
};

export default ModalTara;
