import React, { FC, useCallback } from 'react';
import { useStylesSingleItem } from './single.item.styles';
import { Item } from '../items.table/interfaces';

interface Props {
  item: Item;
  columns: Options;
  active: Item | null;
  changeRule: ChangeRule;
  addUnits: AddUnits;
  onClick: (val: null | Item) => void;
}
type Options = Array<Partial<keyof Item>>;

type ChangeRule = {
  [K in keyof Partial<Item>]: number | string;
};

type AddUnits = {
  [K in keyof Partial<Item>]: string;
};

export const SingleTableItem: FC<Props> = (props) => {
  const { item, columns, changeRule = {}, addUnits = {}, active, onClick } = props;
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
        {columns.map((i: keyof Item, index) => (
          <div key={i} className={`${classes.font} ${index ? classes.nthCol : classes.firstCol}`}>
            {changeRule[i] ? <span>{changeRule[i]}</span> : <span>{item[i]}</span>}
            {addUnits[i] ? <span>{addUnits[i]}</span> : null}
          </div>
        ))}
    </li>
  );
};
