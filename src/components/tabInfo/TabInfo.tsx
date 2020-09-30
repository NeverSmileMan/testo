import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { styles } from './tabInfo.styles';
import { AddedItem } from '../tabs/useTabs.hook';

type Props = {
  value: AddedItem[];
  activeItem: AddedItem | null;
  onClick: React.MouseEventHandler<HTMLDivElement>;
} & WithStyles;

const getTotal = (items: AddedItem[], attr: keyof AddedItem) =>
  items.reduce((sum, item) => sum + +item[attr], 0).toFixed(2);

function TabInfo({ classes, value: tabItems, activeItem: isSelected, onClick }: Props) {
  let total = '0.00';
  if (tabItems) total = getTotal(tabItems, 'cost');

  return (
    <div className={classes.wrapper}>
      {isSelected ? (
        <div className="delete" onClick={onClick} aria-hidden>
          <DeleteForeverIcon />
        </div>
      ) : (
        <div className="total">{total}</div>
      )}
    </div>
  );
}

export const TabInfoStyled = withStyles(styles)(TabInfo);
