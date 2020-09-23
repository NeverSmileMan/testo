import React from 'react';
import FixedBtn from '../calc/fixed.btn/fixed.btn';
import InputWeight from './input.tara/input.weight';
import { useStyles } from './modal.tara.style';

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