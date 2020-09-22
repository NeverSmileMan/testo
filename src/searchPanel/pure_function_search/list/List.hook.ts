import React, { useState, useEffect, useCallback } from 'react';
import { IItem } from '../../../data/Item';
import itemsDataNew from '../../../data/items.json';
import { Props } from './List';

interface IState {
    items: IItem[] | null;
    itemsData: IItem[];
}

const getState = (): IState => ({
    items: null,
    itemsData: itemsDataNew as unknown as IItem[],
});

const getMethods = (
    setState: React.Dispatch<(state: IState) => IState>,
    onSelect: (item: IItem) => void,   
) => {

    const search = (filter: string, state: IState) => {
        const items = state.itemsData.filter(
            item => item.searchIndex.toUpperCase().includes(filter.toUpperCase()) ||
            String(item.plu).includes(filter)
        );
        return items;
    };

    const setFilter = (filter: string) => {
        setState(state => {
            let items;
            if (!filter) items = null;
            else items = search(filter, state);
            return { ...state, items: items };
        });
    };
    
    const onItemSelect = (event: React.MouseEvent<HTMLDivElement>, items: IItem[] | null) => {
        const target = event.target as HTMLElement;
        const itemElem: HTMLElement | null = target.closest('[data-item-index]');
        const itemIndex = itemElem?.dataset['itemIndex'];
        itemIndex && onSelect(items![+itemIndex]);
    };

    return { setFilter, onItemSelect };
};

const useList = ({ filter, onSelect }: Props) => {
    const [state, setState] = useState<IState>(getState);
    const [{ setFilter, onItemSelect }] = useState(getMethods(setState, onSelect));
    const { items } = state;
    const onSelectItem = useCallback((event) => onItemSelect(event, items), [items]);
    useEffect(() => setFilter(filter), [setFilter, filter]);
    return { itemsArray: items, onItemSelect: onSelectItem };
};

export default useList;
