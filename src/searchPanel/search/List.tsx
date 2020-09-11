import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import itemsData, { IItem } from './itemsData';

const useStyles = makeStyles((theme: Theme) => ({
    'list': {
        backgroundColor: theme.palette.primary.main,
        position: 'absolute',
        top: '17%',
        left: '0px',
        width: '100%',
        height: '83%',
        fontSize: '0.9em',
        overflowY: 'auto',
        '& ul': {
            listStyle: 'none',
            margin: '0px',
            padding: '0px',
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

function List({ input }: { input: string }) {
    const classes = useStyles();
    const [{ filter, data = null }, setState] = useState({ filter: input } as { filter: string, data: IItem[] | null});

    useEffect(() => {
        if (!input) {
            setState(() => ({ filter: '', data: null }));
            return;
        }

        if (input === filter) return;

        const data = itemsData.filter(item => item.name.toUpperCase().includes(input.toUpperCase()));

        setState(() => ({ filter: input, data }));
    }, [input]);

    if (!data) return null;
    
    const items = data.map((item, i) => 
        <li key={i} data-item-index={i}>
            <span>{item.plu}</span>
            <span>{item.name}</span>
        </li>
    );

    return (
        <div className={classes.list}>
            {items.length ?

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
