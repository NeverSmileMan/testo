import React from 'react';
import FixedBtn from './calc/fixed.btn';
import {makeStyles} from '@material-ui/styles';
import InputQty from './qtyGoods/input.qty';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        transform: 'translateY(50%)',
        color: '#fff',
        fontSize: '40px',
    }
})

const ModalQtyGoods = () =>{
    const {container} = useStyles()
    return (
        <div className={container}>
            <InputQty />
        </div>
    )
}

export default ModalQtyGoods;