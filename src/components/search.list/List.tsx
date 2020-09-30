import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './list.styles';
import { useList, PropsList } from './list.hook';
import '../../enum/i18n.init';
import { useTranslation } from 'react-i18next';

function ListComponent(props: PropsList) {
  const { items, onItemSelect } = useList(props);
  const { t } = useTranslation();

  if (!items) return null;

  const itemsList = items.map((item, i) => {
    const { id, plu, texts, price } = item;
    const priceFormatted = price.toFixed(2);
    return (
      <li key={id} data-item-index={i}>
        <span>{plu}</span>
        <span>{texts.full_title}</span>
        <span>
          {priceFormatted} {t('currency')}
        </span>
      </li>
    );
  });

  const { classes } = props;

  return (
    <div className={classes.list} onClick={onItemSelect} aria-hidden>
      {items.length ? (
        <ul>{itemsList}</ul>
      ) : (
        <div className={classes.notFound}> {t('not found')} </div>
      )}
    </div>
  );
}

export const List = withStyles(styles)(ListComponent);
