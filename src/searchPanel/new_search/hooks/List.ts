import React, { useState } from 'react';
import List, { IList } from '../data/List';
import { IItem } from '../data/Item';

const changeState = (
    list: IList,
    setState: React.Dispatch<() => (IItem[] | null)>,
    onSelect: (item: IItem) => void,
) => {
    list.onChange(setState);
    const onItemSelect = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        const itemElem: HTMLElement | null = target.closest('[data-item-index]');
        const itemIndex = itemElem?.dataset['itemIndex'];
        itemIndex && onSelect(list.getItems()![+itemIndex]);
    };
    const setFilter = list.setFilter;
    return { onItemSelect, setFilter };
};

const useList = (onSelect: (item: IItem) => void) => {
    const [list] = useState(() => new List());
    const [itemsArray, setState] = useState(list.getItems);
    const [methods] = useState(() => changeState(list, setState, onSelect));
    return { itemsArray, ...methods };
};

export default useList;
