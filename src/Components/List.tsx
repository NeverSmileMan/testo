import React, { useState } from 'react';
import InputObject from '../data.structure/Input';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    'list': {
        backgroundColor: theme.palette.primary.main,
        borderLeft: 'solid 3px ' + theme.palette.primary.main,
        borderBottom: 'solid 3px ' + theme.palette.primary.main,
        position: 'absolute',
        top: '17%',
        left: '0px',
        width: '100%',
        height: '83%',
        overflowY: 'auto',
        fontSize: '0.9em',
        '& ul': {
            listStyle: 'none',
            margin: '0px',
            padding: '0px',
            //overflowY: 'auto',
        },
        '& li': {
            borderBottom: 'solid 1px black',
            paddingLeft: '10px',
            paddingRight: '10px',
            backgroundColor: 'white',
        },
        '& span:first-child': {
            display: 'inline-block',
            width: '50px',
        },
        '& .not-found': {
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold',
        },
    },
}));

const list = InputObject.getInputListInstance().getListInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const itemElem: HTMLElement | null = target.closest('[data-item-index]');
    const itemIndex = itemElem?.dataset['itemIndex'];
    itemIndex && list.selectItem(+itemIndex);
}

function List() {
    const classes = useStyles();
    const [, setState] = useState({});

    useState(() => {
        list.onUpdate(() => {
            setState({});
        });
    });

    const itemsArray = list.getItems();

    if (!itemsArray) return null;
    
    const items = itemsArray.map((item, i) => 
        <li key={i} data-item-index={i}>
            <span>{item.plu}</span>
            <span>{item.name}</span>
        </li>
    );

    return (
        <div className={`${classes.list} list`} onClick={onClick}>
            {items.length?

                <ul>
                    {items}
                </ul> :

                <div className='not-found'>
                    НІЧОГО НЕ ЗНАЙДЕНО
                </div>
            }
        </div>
    );
}

export default List;
