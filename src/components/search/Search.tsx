import React, { ReactElement } from 'react';
import { useSearch, PropsSearch } from './search.hook';
import { ListStyled } from '../search.list/List';
import { InputService } from '../input.service/InputService';

// export type PropsSearch = {
//   callbacks?: {
//     onSelect?: (item: IItem) => void;
//     resetSearch?: (callback: () => void) => void;
//   };
// } & WithStyles;

export function SearchComp(props: PropsSearch): ReactElement {
  const { classes, value, selectItem } = useSearch(props);

  return (
    <div className={classes.wrapper}>
      <div className="input">&nbsp;{value}</div>
      <ListStyled filter={value} onSelect={selectItem} />
    </div>
  );
}

export function Search(): ReactElement {
  return <InputService>{SearchComp}</InputService>;
}
