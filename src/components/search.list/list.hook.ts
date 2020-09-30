import React, { useState, useEffect, MouseEventHandler, Dispatch, SetStateAction, useCallback } from 'react';
import { WithStyles } from '@material-ui/core/styles';
import { IItem } from './Item';

interface IState {
  items: IItem[] | null;
  filter: string;
}

const getState = (): IState => ({
  items: null,
  filter: '',
});

const getMethods = (
  setState: Dispatch<SetStateAction<IState>>,
  props: {
    onSelect: (item: IItem) => void;
    searchService: ISearchService;
  },
) => {
  const { onSelect, searchService } = props;
  const setFilter = (filter: string) => {
    if (!filter) return setState(() => ({ items: null, filter: '' }));

    setState((state) => {
      return { ...state, filter };
    });

    searchService
      .getItemsBySearchIndex(filter)
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

interface ISearchService {
  getItemsBySearchIndex: (searchIndex: string) => Promise<IItem[]>;
}

export type PropsList = {
  filter: string;
  onSelect: (item: IItem) => void;
  searchService: ISearchService;
} & WithStyles;

interface IUseList {
  items: IItem[] | null;
  onItemSelect: MouseEventHandler<HTMLDivElement>;
}

export const useList = (props: PropsList): IUseList => {
  const [{ items }, setState] = useState<IState>(getState);
  const [{ setFilter, onItemSelect: onSelect }] = useState(getMethods(setState, props));
  const onItemSelect = useCallback((event) => onSelect(event, items), [items, onSelect]);
  useEffect(() => setFilter(props.filter), [setFilter, props]);
  return { items, onItemSelect };
};
