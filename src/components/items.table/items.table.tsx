import React, { FC } from 'react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useStylesTable } from './items.table.styles';
import { SingleTableItem } from '../single.table.item/single.item';
import { Item } from './interfaces';
import { ItemTypes } from '../../enum/item.types';

interface Props {
  active: Item | null;
  onClick: React.Dispatch<React.SetStateAction<Item | null>>;
  values: Item[];
}

function getUnits(type: string, t: TFunction): string {
  if (type === ItemTypes.WEIGHED) {
    return t('units', { context: 'gramme' });
  }
  return t('units', { context: 'qty' });
}

export const AddedItemsTable: FC<Props> = (props) => {
  const { values, onClick, active } = props;
  const classes = useStylesTable();
  const { t } = useTranslation();
  return (
    <ul className={classes.bodyContainer}>
      {values
        ? values.map((item: Item) => (
            <SingleTableItem
              item={item}
              changeRule={{
                cost: item.cost.toFixed(2),
                texts: `${item.plu} ${item.texts.full_title}`,
              }}
              columns={['texts', 'amount', 'cost']}
              addUnits={{ amount: getUnits(item.type, t) }}
              active={active}
              key={item.id}
              onClick={onClick}
            />
          ))
        : null}
    </ul>
  );
};
