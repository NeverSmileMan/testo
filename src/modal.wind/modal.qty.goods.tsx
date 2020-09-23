import React from 'react';
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
interface Prop {
    modalClose: ()=>any;
}
const ModalQtyGoods = ({modalClose}:Prop) =>{
    const {container} = useStyles()
    
    return (
        <div className={container}>
            <InputQty modalClose={modalClose}/>
        </div>
    )
}

export default ModalQtyGoods;