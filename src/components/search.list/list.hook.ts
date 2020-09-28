import React, { useState, useEffect, useCallback, MouseEventHandler } from 'react';
import { WithStyles } from '@material-ui/core/styles';
import { IItem } from './Item';
import itemsDataJSON from '../../entries/assets/data/items.json';
import { getItemsBySearchIndex } from '../../entries/assets/helpers/requests';

const config = { server: false };
const itemsData = itemsDataJSON as IItem[];

export type PropsList = {
  filter: string;
  onSelect: (item: IItem) => void;
} & WithStyles;

interface IState {
  items: IItem[] | null;
  filter: string;
}

const getState = (): IState => ({
  items: null,
  filter: '',
});

const getMethods = (
  setState: React.Dispatch<(state: IState) => IState>,
  onSelect: (item: IItem) => void,
) => {
  const staticSearch = (filter: string): IItem[] => {
    return itemsData.filter(
      (item) =>
        item.searchIndex.toUpperCase().includes(filter) || String(item.plu).includes(filter),
    );
  };

  const search = (filter: string): Promise<IItem[]> => {
    if (config.server) {
      return getItemsBySearchIndex(filter).then((result) => {
        if (result) return result;
        return staticSearch(filter);
      });
    }
    return Promise.resolve(staticSearch(filter));
  };

  const setFilter = (filter: string) => {
    if (!filter) return setState(() => ({ items: null, filter: '' }));

    if (!config.server) {
      return setState(() => ({
        filter,
        items: staticSearch(filter),
      }));
    }

    setState((state) => {
      return { ...state, filter };
    });

    search(filter)
      .then((items: IItem[]) =>
        setState((state) => (state.filter === filter && { filter, items }) || state),
      )
      // eslint-disable-next-line no-console
      .catch(console.log);

    return undefined;
  };

  const onItemSelect = (event: React.MouseEvent<HTMLDivElement>, items: IItem[] | null) => {
    const target = event.target as HTMLElement;
    const itemElem: HTMLElement | null = target.closest('[data-item-index]');
    const itemIndex = itemElem?.dataset.itemIndex;
    if (itemIndex && items) onSelect(items[+itemIndex]);
  };

  return { setFilter, onItemSelect };
};

interface IUseList {
  items: IItem[] | null;
  onItemSelect: MouseEventHandler<HTMLDivElement>;
}

export const useList = ({ filter, onSelect }: PropsList): IUseList => {
  const [{ items }, setState] = useState<IState>(getState);
  const [{ setFilter, onItemSelect }] = useState(getMethods(setState, onSelect));
  const onSelectItem = useCallback((event) => onItemSelect(event, items), [onItemSelect, items]);
  useEffect(() => setFilter(filter), [setFilter, filter]);
  return { items, onItemSelect: onSelectItem };
};
