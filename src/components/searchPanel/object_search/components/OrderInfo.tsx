import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/OrderInfo';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';    
// import { OrderControlContext } from '../order.control/OrderControl';
import { AddedItem } from '../../../tabs/use.Tab.hook';

type Props = {
    value: AddedItem[];
    activeItem: AddedItem | null;
    onClick: () => void;
} & WithStyles;

const getTotal = (items: AddedItem[], attr: keyof AddedItem) => 
    items.reduce((sum, item) => sum += +item[attr], 0).toFixed(2);

function OrderInfo({
    classes,
    value: orderItems,
    activeItem: isSelected,
    onClick }: Props
    ) {
    
    // const { isSelected, total } = useContext(OrderControlContext);

    const total = getTotal(orderItems, 'cost');

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
