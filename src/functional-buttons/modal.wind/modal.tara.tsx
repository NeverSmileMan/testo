import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import FixedBtn from './calc/fixed.btn';
import InputWeight from './tara/input.weight';
import { MainContext } from '../../main';

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
    click?: any;
}
const initialWeight = 4;
const initStep = 2;
const countBtn = 9;
const units='гр.'

const ModalTara = ({ click }: Prop) => {
    const cls = useStyles();
    
    return (
        <div className={cls.container}>
            <InputWeight />
            <FixedBtn
                units= {units}
                strNumber={initialWeight}
                step={initStep}
                countButton={countBtn} />
        </div>
    )
}

export default ModalTara;