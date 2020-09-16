import React, { useState } from 'react';
import ListObject from '../data.structure/List';
import { IItem } from '../data.structure/Item';

const changeState = (onSelect: (item: IItem) => void, setState: React.Dispatch<() => (IItem[] | null)>) => {
    const list = new ListObject();
    list.onChange((itemsArray: IItem[] | null) => setState(() => itemsArray));
    const onItemSelect = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        const itemElem: HTMLElement | null = target.closest('[data-item-index]');
        const itemIndex = itemElem?.dataset['itemIndex'];
        itemIndex && onSelect(list.getItems()![+itemIndex]);
    };
    const setFilter = list.setFilter.bind(list);
    return { onItemSelect, setFilter };
};

const useList = (onSelect: (item: IItem) => void) => {
    const [itemsArray, setState] = useState<IItem[] | null>(() => null);
    const [callbacks] = useState(() => changeState(onSelect, setState));
    return { itemsArray, ...callbacks };
};

export default useList;
