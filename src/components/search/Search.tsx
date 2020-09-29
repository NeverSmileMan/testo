import React from 'react';
import { useSearch } from './search.hook';
import { ListStyled } from '../search.list/List';

// export type PropsSearch = {
//   callbacks?: {
//     onSelect?: (item: IItem) => void;
//     resetSearch?: (callback: () => void) => void;
//   };
// } & WithStyles;

export function Search() {
  const { classes, value, selectItem } = useSearch();

  return (
    <div className={classes.wrapper}>
      <div className="input">&nbsp;{value}</div>
      <ListStyled filter={value} onSelect={selectItem} />
    </div>
  );
}
