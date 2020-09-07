import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    'list': {
        backgroundColor: 'rgb(0, 153, 255)',
        position: 'absolute',
        top: '50px',
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

function List() {
    const classes = useStyles();
    const [, setState] = useState({});

    const itemsArray = [] as { plu: string, name: string }[];

    if (!itemsArray) return null;
    
    const items = itemsArray.map((item, i) => 
        <li key={i} data-item-index={i}>
            <span>{item.plu}</span>
            <span>{item.name}</span>
        </li>
    );

    return (
        <div className={`${classes.list} list`}>
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
