import React, { useState, useEffect, useCallback } from 'react';
import { IItem } from '../../data/Item';
import itemsDataNew from '../../data/items.json';
import { Props } from './List';
import {getItemsBySearchIndex} from '../../data/search.request';

interface IState {
    items: IItem[] | null;
    itemsData: IItem[];
    filter: string;
}

const getState = (): IState => ({
    items: null,
    itemsData: itemsDataNew as unknown as IItem[],
    filter: '',
});

const getMethods = (
    setState: React.Dispatch<(state: IState) => IState>,
    onSelect: (item: IItem) => void,   
) => {

    const staticSearch = (filter: string, state: IState) => {
        return state.itemsData.filter(
            item => item.searchIndex.toUpperCase().includes(filter)
            || String(item.plu).includes(filter)
        );
    }

    const search = (filter: string, state: IState) => {
        return getItemsBySearchIndex(filter)
            .then(result => {
                if (result) return result;
                return staticSearch(filter, state);
            })
            .catch(console.log);
    };

    const setFilter = (filter: string) => {

        if (!filter) return setState(state => ({ ...state, items: null, filter: '' }));
        
        setState(state => ({
            ...state,
            filter,
            items: staticSearch(filter, state),
        }));

        return;

        let currentState: IState = {} as IState;
        setState(state => { currentState = state; return { ...state, filter } });
        
        search(filter, currentState)
            .then(items => 
                setState(state =>
                    (state.filter === filter && { ...state, items }) || state
                )
            );
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
