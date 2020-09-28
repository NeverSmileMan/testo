import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './list.styles';
import { useList, PropsList } from './list.hook';

function List(props: PropsList) {
  const { items, onItemSelect } = useList(props);

  if (!items) return null;

  const itemsList = items.map(({ id, plu, texts, price }, i) => (
    <li key={id} data-item-index={i}>
      <span>{plu}</span>
      <span>{texts.full_title}</span>
      <span>{price.toFixed(2)} грн</span>
    </li>
  ));
  const { classes } = props;
  return (
    <div className={classes.list} onClick={onItemSelect} aria-hidden>
      {items.length ? <ul>{itemsList}</ul> : <div className="not-found">ЗБІГИ ВІДСУТНІ</div>}
    </div>
  );
}

export const ListStyled = withStyles(styles)(List);
