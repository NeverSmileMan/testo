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

const ModalQtyGoods = (props: any) =>{
    const {container} = useStyles()

    console.log(props)
    return (
        <div className={container}>
            <InputQty callback={props.callback}/>
        </div>
    )
}

export default ModalQtyGoods;