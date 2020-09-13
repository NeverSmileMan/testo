import React, { useState } from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles } from '@material-ui/core/styles';
import OrderControl from '../../data.structure/OrderControl';
import { IItemAmount } from '../../data.structure/Item';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        height: '100%',
        backgroundColor: theme.palette.secondary.light,
        border: 'solid 3px ' + theme.palette.primary.main,
        borderTop: 'none',
        overflowY: 'auto',
        '& ul': {
            listStyle: 'none',
            margin: '0px',
            padding: '0px',
        },
        '& li': {
            fontSize: '1.1rem',
            borderBottom: 'solid 1px ' + theme.palette.secondary.dark,
            paddingLeft: '2rem',
            paddingRight: '2rem',
            backgroundColor: 'white',
            '&:first-child': {
                borderTop: 'solid 1px ' + theme.palette.secondary.dark,
            }
        },
        '& span': { 
            display: 'inline-block',
            '&:first-child': {
                width: '10%',
                marginRight: '2rem',
            },
            '&:nth-child(2)': {
                width: '55%',
            },
        },
        '& .selected': {
            backgroundColor: theme.palette.secondary.dark,
            color: 'white',
        },
    },
}));

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
            className={selectedItemIndex === i && 'selected' || ''}>
            
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
