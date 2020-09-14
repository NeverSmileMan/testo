import React, { useCallback, useContext } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderItems';
import { OrderControlContext } from '../Orders';

const selectItem = (event: React.MouseEvent<HTMLDivElement>, selectItem: (index: number) => void) => {
    const target = event.target as HTMLElement;
    const itemElem: HTMLElement | null = target.closest('[data-item-index]');
    const itemIndex = itemElem?.dataset['itemIndex'];
    itemIndex && Number.parseInt(itemIndex) >=0 && selectItem(+itemIndex);
}

type Props = {
    onSelect: (index: number | null) => void;
} & WithStyles;

function OrderItems({ classes, onSelect }: Props) {
    const { orderItems, selectedItemIndex } = useContext(OrderControlContext);
    const onClick = useCallback((event) => selectItem(event, onSelect), []);

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
