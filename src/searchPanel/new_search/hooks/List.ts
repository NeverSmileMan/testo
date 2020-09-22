import React, { useState, useEffect } from 'react';
import List, { IList } from '../objects/List';
import { IItem } from '../../data/Item';

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

const useList = (filter: string, onSelect: (item: IItem) => void) => {
    const [list] = useState(() => new List());
    const [itemsArray, setState] = useState(list.getItems);
    const [{ onItemSelect, setFilter }] = useState(() => changeState(list, setState, onSelect));
    useEffect(() => setFilter(filter), [setFilter, filter]);
    return { itemsArray, onItemSelect };
};

export default useList;
