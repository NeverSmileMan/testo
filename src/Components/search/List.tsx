import React, { useState } from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';
import Input from '../../data.structure/Input';

const styles = createStyles((theme: Theme) => ({
    'list': {
        backgroundColor: theme.palette.primary.light,
        border: 'solid 3px ' + theme.palette.primary.main,
        borderTop: 'none',
        borderRight: 'none',
        position: 'absolute',
        top: '17%',
        left: '0px',
        width: 'calc(100% - 3px)',
        height: '83%',
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
        '& .not-found': {
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: theme.palette.primary.main,
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
    },
}));

const list = Input.getInputListInstance().getListInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const itemElem: HTMLElement | null = target.closest('[data-item-index]');
    const itemIndex = itemElem?.dataset['itemIndex'];
    itemIndex && list.selectItem(+itemIndex);
}

let setState: React.Dispatch<{}>;
const changeState = () => {
    list.onChange(
        () => setState({})
    );
    return {};
};

function List({ classes }: WithStyles) {

    [, setState] = useState(changeState);

    const itemsArray = list.getItems();

    if (!itemsArray) return null;
    
    const items = itemsArray.map((item, i) => 
        <li key={i} data-item-index={i}>
            <span>{item.plu}</span>
            <span>{item.name}</span>
        </li>
    );

    return (
        <div className={classes.list} onClick={onClick}>
            {items.length?
                <ul>
                    {items}
                </ul> :
                <div className='not-found'>
                    ЗБІГИ ВІДСУТНІ
                </div>
            }
        </div>
    );
}

export default withStyles(styles)(List);
