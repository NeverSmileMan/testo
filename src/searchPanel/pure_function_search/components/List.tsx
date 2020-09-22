import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/List';
import { IItem } from '../objects/items';
import useList from '../hooks/List';

export type Props = {
    filter: string;
    onSelect: (item: IItem) => void;
} & WithStyles;

function List(props: Props) {
    const { itemsArray, onItemSelect } = useList(props);

    if (!itemsArray) return null;
    
    const items = itemsArray.map((item, i) =>
        <li key={i} data-item-index={i}>
            <span>{item.code}</span>
            <span>{item.name}</span>
        </li>
    );

    return (
        <div className={props.classes.list} onClick={onItemSelect}>
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
