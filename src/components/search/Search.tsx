import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles } from './search.styles';
import { IItem } from '../search.list/Item';
import { useSearch } from './search.hook';
import { ListStyled } from '../search.list/List';

export type PropsSearch = {
  callbacks?: {
    onSelect?: (item: IItem) => void;
    resetSearch?: (callback: () => void) => void;
  };
} & WithStyles;

function Search({ classes }: PropsSearch) {
  const { isFocus, value, ref, selectItem } = useSearch();

  return (
    <div className={classes.wrapper}>
      <div ref={ref} className={`input ${isFocus ? 'focus' : 'focus'}`} />
      <ListStyled filter={value} onSelect={selectItem} />
    </div>
  );
}

export const SearchStyled = withStyles(styles)(Search);
