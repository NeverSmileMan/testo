import React, { useState } from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles } from '@material-ui/core/styles';
import TabControl from '../../data.structure/OrderControl';

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
            paddingLeft: '10px',
            paddingRight: '10px',
            backgroundColor: 'white',
            '&:first-child': {
                borderTop: 'solid 1px ' + theme.palette.secondary.dark,
            }
        },
        '& span': { 
            display: 'inline-block',
            '&:first-child': {
                width: '100px',
                marginRight: '2rem',
            },
            '& nth-child(2)': {
                width: '250px',
            },
        },
        '& .selected': {
            backgroundColor: theme.palette.secondary.dark,
            color: 'white',
        },
    },
}));

const tabControl = TabControl.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const itemElem: HTMLElement | null = target.closest('[data-item-index]');
    const itemIndex = itemElem?.dataset['itemIndex'];
    itemIndex && Number.parseInt(itemIndex) >=0 && tabControl.selectItem(+itemIndex);
}

function OrderItems({ classes }: WithStyles) {

    const [, setState] = useState({});

    useState(() => {
        tabControl.onChange(() =>
            setState({}))
    });

    const selectedItemIndex = tabControl.getSelectedItemIndex();
    const items = tabControl.getItems().map((item, i) =>
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
