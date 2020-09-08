import React, { useState } from 'react';
import InputObject from '../data.structure/Input';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    'list': {
        backgroundColor: 'rgb(0, 153, 255)',
        '& ul': {
            listStyle: 'none',
            margin: '0px',
            padding: '0px',
            overflowY: 'auto',
            textAlign: 'left',
            maxHeight: '368px',
        },
        '& li': {
            fontSize: '0.8em',
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
            width: '100%',
            height: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold',
        },

    },
});

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
            <ul>
                {items.length ?
                    items :
                    <div className='not-found'>
                        <div>НІЧОГО НЕ ЗНАЙДЕНО</div>
                    </div>
                }
            </ul>
        </div>
    );
}

export default List;
