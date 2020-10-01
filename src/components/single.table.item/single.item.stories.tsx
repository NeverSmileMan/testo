import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { object, array } from '@storybook/addon-knobs';

import { ItemTypes } from '../../enum/item.types';
import { SingleTableItem } from './single.item';
import { item } from '../items.table/items.table.stories';

const label = 'Item';
const defaultValue = item;

const labelColumns = 'columns';

function getUnits(type: string): string {
  if (type === ItemTypes.WEIGHED) {
    return 'г.';
  }
  return 'шт.';
}

storiesOf('AddedItemsTable', module)
  .addDecorator(withKnobs)
  .add('no active sinlge item', () => (
    <SingleTableItem
      item={object(label, defaultValue)}
      columns={array(labelColumns, getColumns(defaultValue))}
      active={null}
      onClick={action('switch to active')}
    />
  ))
  .add('active sinlge item', () => (
    <SingleTableItem
      item={object(label, defaultValue)}
      columns={array(labelColumns, getColumns(defaultValue))}
      active={object(label, defaultValue)}
      onClick={action('switch to unactive')}
    />
  ));

function getColumns(item: any): string[] {//! версия без перевода
  return [
    `${item.plu} ${item.texts.full_title}`,
    `${item.amount} ${getUnits(item.type)}`,
    item.cost.toFixed(2),
  ];
}
