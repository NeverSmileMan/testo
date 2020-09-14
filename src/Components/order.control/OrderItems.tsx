import React, { useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderItems';
import OrderControl from '../../data.structure/OrderControl';
import { IItemAmount } from '../../data.structure/Item';

const orderControl = OrderControl.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const itemElem: HTMLElement | null = target.closest('[data-item-index]');
    const itemIndex = itemElem?.dataset['itemIndex'];
    itemIndex && Number.parseInt(itemIndex) >=0 && orderControl.selectItem(+itemIndex);
}

interface IState {
    selectedItemIndex: number | null,
    orderItems: IItemAmount[],
}

const getState = () => ({
    selectedItemIndex: orderControl.getSelectedItemIndex(),
    orderItems: orderControl.getItems(),
});

let setState: React.Dispatch<() => IState>;
let state: IState;
const changeState = () => {
    orderControl.onChange(
        () => setState(() => getState())
    );
    return getState();
};

function OrderItems({ classes }: WithStyles) {

    [state, setState] = useState(changeState);

    const selectedItemIndex = state.selectedItemIndex;
    const items = state.orderItems.map((item, i) =>
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
