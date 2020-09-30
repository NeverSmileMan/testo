import React, { ReactElement, useState, Dispatch, SetStateAction } from 'react';
import { ActiveInputService } from '../../enum/ActiveInputService';
import { IItem } from '../search.list/Item';
// eslint-disable-next-line import/extensions
import { SearchService } from '../search.list/request/requests';

export interface IInputService {
  setActive: (setValue: Dispatch<SetStateAction<string>>) => void;
  unsetActive: (setValue: Dispatch<SetStateAction<string>>) => void;
}

export interface ISearchService {
  getItemsBySearchIndex: (searchIndex: string) => Promise<IItem[]>;
}

export interface IServices {
    inputService: IInputService;
    searchService: ISearchService;
}

export function Services(props: {
  children: React.FunctionComponent<IServices>;
}): ReactElement {
  const [services] = useState({
    inputService: ActiveInputService,
    searchService: SearchService,
  });
  const { children: Input } = props;
  return React.createElement(Input, { ...props, ...services }, []);
}
