import React, { useCallback } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderInfo';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';    
import { IOrderControl } from '../../data.structure/OrderControl';

const getState = (orderControl: IOrderControl) => ({
    isSelected: orderControl.isSelected(),
    total: orderControl.getTotal().toFixed(2),
});

type Props = {
    value: { orderControl: IOrderControl };
} & WithStyles;

function OrderInfo({ classes, value }: Props) {
    const { orderControl } = value; 
    const { isSelected, total } = getState(orderControl);
    const onClick = useCallback(() => orderControl.delItem(), []);
    return (
        <div className={classes.wrapper}>
            {isSelected ?
                <div className='delete' onClick={onClick}>
                    <DeleteForeverIcon />
                </div> :
                <div className='total'>
                    {total}
                </div>
            }
        </div>
    );
}

export default withStyles(styles)(OrderInfo);
