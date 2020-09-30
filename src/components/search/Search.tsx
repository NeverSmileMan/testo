import React, { ReactElement } from 'react';
import { useSearch, PropsSearch } from './search.hook';
import { List } from '../search.list/List';
import { Services } from '../services/Services';

// export type PropsSearch = {
//   callbacks?: {
//     onSelect?: (item: IItem) => void;
//     resetSearch?: (callback: () => void) => void;
//   };
// } & WithStyles;

export function SearchComp(props: PropsSearch): ReactElement {
  const { classes, value, selectItem, searchService } = useSearch(props);

  return (
    <div className={classes.wrapper}>
      <div className="input">&nbsp;{value}</div>
      <List filter={value} onSelect={selectItem} searchService={searchService} />
    </div>
  );
}

export function Search(): ReactElement {
  return <Services>{SearchComp}</Services>;
}