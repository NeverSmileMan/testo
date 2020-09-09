import React from 'react';
import {makeStyles} from '@material-ui/styles';
import FixedWeight from './taraCalc/fexed.weight';
import InputWeight from './taraCalc/input.weight';

const useStyles = makeStyles({
    'conteiner': {
        display: 'flex',
        justifyContent: 'center',
        transform: 'translateY(50%)',
        color: '#fff',
        fontSize: '40px',
    },
});

const ModalTara = () => {
    const classes = useStyles();
    return (
        <div className={classes.conteiner}>
            <InputWeight/>
            <FixedWeight/>
        </div>
    );
};

export default ModalTara;
