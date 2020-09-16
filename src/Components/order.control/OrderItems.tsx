import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderItems';
import useOrderItems from '../../hooks/OrderItems';

type Props = {
    onSelect: (index: number | null) => void;
} & WithStyles;

function OrderItems({ classes, onSelect }: Props) {
    const { orderItems, selectedItemIndex, onClick } = useOrderItems(onSelect);
    
    const items = orderItems.map((item, i) =>
        <li 
            key={i}
            data-item-index={i}
            className={selectedItemIndex === i ? 'selected' : ''}>
            <span>{item.plu}</span>
            <span>{item.name}</span>
        </li>);

    return (
        <div className={classes.wrapper} onClick={onClick}>
            <ul>
                {items}
            </ul>
        </div>
    );
}

export default withStyles(styles)(OrderItems);
