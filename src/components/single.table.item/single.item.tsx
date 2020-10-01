import React, { FC, useCallback } from 'react';
import { useStylesSingleItem } from './single.item.styles';
import { Item } from '../items.table/interfaces';

interface Props {
  item: Item;
  columns: string[];
  active: Item | null;
  onClick: (val: null | Item) => void;
}

export const SingleTableItem: FC<Props> = (props) => {
  const { item, columns, active, onClick } = props;
  const classes = useStylesSingleItem();

  const selectItem = useCallback(() => {
    if (active === item) {
      onClick(null);
    } else {
      onClick(item);
    }
  }, [item, active, onClick]);

  return (
    <li className={`${classes.row} ${active === item ? classes.active : ''}`} onClick={selectItem} aria-hidden="true" >
      {columns.map((i, index) => (
        <div key={i} className={`${classes.font} ${index ? classes.nthCol : classes.firstCol}`}>
          {i}
        </div>
      ))}
    </li>
  );
};
