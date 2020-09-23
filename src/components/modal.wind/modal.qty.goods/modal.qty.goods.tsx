import React from 'react';
import InputQty from './input.qty/input.qty';
import { useStyles } from './modal.qty.goods.style';

interface Prop {
    modalClose: () => any;
}
const ModalQtyGoods = ({ modalClose }: Prop) => {
    const { container } = useStyles()

    return (
        <div className={container}>
            <InputQty modalClose={modalClose} />
        </div>
    )
}

export default ModalQtyGoods;