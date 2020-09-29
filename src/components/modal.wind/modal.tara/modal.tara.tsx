import React from 'react';
import { FixedBtn } from '../fixed.btn/fixed.btn';
import { InputWeight } from './input.tara/input.weight';
import { useStyles } from './modal.tara.style';

interface Prop {
    modalClose: () => any;
    submitValueCalc: (num: number) => void;
}
const initialWeight = [4, 6, 8, 10, 12, 14, 16, 18, 20];
const units = 'гр.'

export const ModalTara = ({ modalClose, submitValueCalc }: Prop) => {
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
            />
        </div>
    )
}
