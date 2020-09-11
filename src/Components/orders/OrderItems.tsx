import React, { useState } from 'react';
import TabControl from '../../data.structure/OrderControl';
import { makeStyles, Theme } from '@material-ui/core/styles';

// const useStyle = makeStyles({
//     'order-items': {
//         backgroundColor: 'grey',
//         //width: '100%',
//         flex: '1 0 0',
//     }
// });

const useStyles = makeStyles((theme: Theme) => ({
    'order-items': {
        backgroundColor: '#e4e4e4', //theme.palette.primary.main,
        borderLeft: 'solid 3px ' + theme.palette.primary.main,
        borderBottom: 'solid 3px ' + theme.palette.primary.main,
        borderRight: 'solid 3px ' + theme.palette.primary.main,
        flex: '1 0 0',
        //position: 'absolute',
        // top: '17%',
        // left: '0px',
        // width: '100%',
        // height: '83%',
        overflowY: 'auto',
        fontSize: '0.9em',
        '& ul': {
            listStyle: 'none',
            margin: '0px',
            padding: '0px',
        },
        '& li': {
            borderBottom: 'solid 1px gray',
            paddingLeft: '10px',
            paddingRight: '10px',
            backgroundColor: 'white',
        },
        '& span:first-child': {
            display: 'inline-block',
            width: '50px',
        },
        '& .selected': {
            backgroundColor: 'grey', //theme.palette.primary.main,
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

function OrderItems() {
    const classes = useStyles();
    const [, setState] = useState({});

    useState(() => {
        tabControl.on('stateChange', () =>
            setState({}))
    });

    const selectedItemIndex = tabControl.getSelectedItemIndex();
    const items = tabControl.getItems().map((item, i) =>
        <li key={i} data-item-index={i} className={(selectedItemIndex === i && 'selected') || ''}>{item.name}</li>);

    return (
        <div className={classes['order-items']} onClick={onClick}>
            <ul>
                {items}
            </ul>
        </div>
    );
}

export default OrderItems;
