import React from 'react';
import { makeStyles } from '@material-ui/styles';
import FixedBtn from './calc/fixed.btn';
import InputWeight from './tara/input.weight';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        transform: 'translateY(50%)',
        color: '#fff',
        fontSize: '40px',
    }
})
interface Prop {
    modalClose: () => any;
    submitValueCalc: (num: number) => void;
}
const initialWeight = 4;
const initStep = 2;
const countBtn = 9;
const units = 'гр.'

const ModalTara = ({ modalClose, submitValueCalc }: Prop) => {
    const cls = useStyles();

    return (
        <div className={cls.container}>
            <InputWeight 
                submitValueCalc={submitValueCalc} 
                modalClose={modalClose} />
            <FixedBtn
                submitValueCalc={submitValueCalc}
                modalClose={modalClose}
                units={units}
                strNumber={initialWeight}
                step={initStep}
                countButton={countBtn} />
        </div>
    )
}

export default ModalTara;