import React from 'react';
import {makeStyles} from '@material-ui/styles';
import FixedWeight from './taraCalc/fexed.weight';

const useStyles = makeStyles({
    title: {
        display: 'flex',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '40px',
    }
})

interface Prop {
    title?: string;
}

const ModalTara = ({title='Тара'}:Prop) => {
    const cls = useStyles();
    return (
        <div className={cls.title}>
            <FixedWeight/>
        </div>
    )
}

export default ModalTara;