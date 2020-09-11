import React from 'react';
import {makeStyles} from '@material-ui/styles';
import FixedWeight from './taraCalc/fixed.weight';
import InputWeight from './taraCalc/input.weight';

const useStyles = makeStyles({
    conteiner: {
        display: 'flex',
        justifyContent: 'center',
        transform: 'translateY(50%)',
        color: '#fff',
        fontSize: '40px',
    }
})
interface Prop {
    click?: any;
}

const ModalTara = ({ click }:Prop) => {
    const cls = useStyles();
    
    return (
        <div className={cls.conteiner}>
            <InputWeight/>
            <FixedWeight/>
        </div>
    )
}

export default ModalTara;