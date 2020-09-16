import React, { useEffect, useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/search/List';
import ListObject from '../../data.structure/List';
import { IItem } from '../../data.structure/Item';

let setState: React.Dispatch<() => (IItem[] | null)>;
let itemsArray: IItem[] | null;
let onItemSelect: (event: React.MouseEvent<HTMLDivElement>) => void;
let setFilter: (filter: string) => void;
const changeState = (onSelect: (item: IItem) => void) => {
    const list = new ListObject();
    onItemSelect = (event) => {
        const target = event.target as HTMLElement;
        const itemElem: HTMLElement | null = target.closest('[data-item-index]');
        const itemIndex = itemElem?.dataset['itemIndex'];
        itemIndex && onSelect(list.getItems()![+itemIndex]);
    }
    setFilter = list.setFilter.bind(list);
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
    [itemsArray, setState] = useState<IItem[] | null>(() => changeState(onSelect));

    useEffect(() => setFilter(filter), [filter]);

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
