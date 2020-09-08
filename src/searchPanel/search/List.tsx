import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import itemsData from './itemsData';

const useStyles = makeStyles((theme: Theme) => ({
    'list': {
        backgroundColor: theme.palette.primary.main,
        position: 'absolute',
        top: '50px',
        left: '0px',
        width: '1300px',
        height: '353px',
        fontSize: '0.9em',
        '& ul': {
            listStyle: 'none',
            margin: '0px',
            padding: '0px',
            overflowY: 'auto',
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

function List() {
    const classes = useStyles();
    const [state, setState] = useState(true);

    const itemsArray = itemsData as any as { plu: string, name: string }[];

    if (!itemsArray) return null;
    
    const items = itemsArray.map((item, i) => 
        <li key={i} data-item-index={i}>
            <span>{item.plu}</span>
            <span>{item.name}</span>
        </li>
    );

    return (
        <div className={classes.list} onClick={() => setState((state) => !state)}>
            {items.length && state ?

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
