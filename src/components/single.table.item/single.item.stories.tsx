import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { object, array } from '@storybook/addon-knobs';

import { ItemTypes } from '../../enum/item.types';
import { SingleTableItem, Options } from './single.item';
import { item } from '../items.table/items.table.stories';

const label = 'Item';
const defaultValue = item;

const labelColumns = 'columns';
const defaultColumns = ['texts', 'amount', 'cost'];

const labelChangeRule = 'changeRule';
const defaultChangeRule = {
  cost: item.cost.toFixed(2),
  texts: `${item.plu} ${item.texts.full_title}`,
};

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
      columns={array(labelColumns, defaultColumns) as Options}
      active={null}
      changeRule={object(labelChangeRule, defaultChangeRule)}
      addUnits={{ amount: getUnits(item.type) }}
      onClick={action('switch to active')}
    />
  ))
  .add('active sinlge item', () => (
    <SingleTableItem
      item={object(label, defaultValue)}
      columns={array(labelColumns, defaultColumns) as Options}
      active={object(label, defaultValue)}
      changeRule={object(labelChangeRule, defaultChangeRule)}
      addUnits={{ amount: getUnits(item.type) }}
      onClick={action('switch to active')}
    />
  ));
