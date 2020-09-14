import React, { useCallback, useEffect, useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/search/List';
import ListObject from '../../data.structure/List';
import { IItem } from '../../data.structure/Item';

const list = ListObject.getInstance();

const onItemSelect = (event: React.MouseEvent<HTMLDivElement>, onSelect: (item: IItem) => void) => {
    const target = event.target as HTMLElement;
    const itemElem: HTMLElement | null = target.closest('[data-item-index]');
    const itemIndex = itemElem?.dataset['itemIndex'];
    itemIndex && onSelect(list.getItems()![+itemIndex]);
}

let setState: React.Dispatch<() => (IItem[] | null)>;
    let itemsArray: IItem[] | null;
const changeState = () => {
    list.onChange(
        (itemsArray) => setState(() => itemsArray)
    );
    return null;
};

type Props = {
    filter: string;
    onSelect: (item: IItem) => void;
} & WithStyles;

function List({ classes, filter, onSelect }: Props) {
    [itemsArray, setState] = useState<IItem[] | null>(changeState);

    const onClick = useCallback((event) => onItemSelect(event, onSelect), []);
    useEffect(() => list.setFilter(filter), [filter]);

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
