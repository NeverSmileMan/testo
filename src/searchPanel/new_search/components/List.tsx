import React, { useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/search/List';
import { IItem } from '../../data.structure/Item';
import useList from '../../hooks/List';

type Props = {
    filter: string;
    onSelect: (item: IItem) => void;
} & WithStyles;

function List({ classes, filter, onSelect }: Props) {
    const { itemsArray, setFilter, onItemSelect } = useList(onSelect);
    useEffect(() => setFilter(filter), [setFilter, filter]);

    if (!itemsArray) return null;
    
    const items = itemsArray.map((item, i) =>
        <li key={i} data-item-index={i}>
            <span>{item.plu}</span>
            <span>{item.name}</span>
        </li>
    );

    return (
        <div className={classes.list} onClick={onItemSelect}>
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
