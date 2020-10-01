import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { object, array } from '@storybook/addon-knobs';

import { ItemTypes } from '../../enum/item.types';
import { SingleTableItem, Options } from './single.item';

const label = 'Item';
const defaultValue = {
  id: '734ae666-ad1c-2440-7d16-9d22debf1c99',
  plu: 903,
  searchIndex: 'Гриби Гливи жовті\r\n#75#Грибы Вешенки желтые',
  price: 29.99,
  type: ItemTypes.WEIGHED,
  defaults: {
    tara: 0,
    pieces_per_package: 0,
  },
  lifetime: {
    shelf_life_1: 0,
  },
  texts: {
    article: '492273',
    shop: 'Сильпо Винница',
    short_title: 'ГрибиКгГливиЖовтi',
    full_title: 'Гриби Гливи жовті',
  },
  cost: 26,
  amount: 241,
};


const item = object(label, defaultValue);

const labelColumns = 'columns';
const defaultColumns = ['texts', 'amount', 'cost'];

const labelChangeRule = 'changeRule';
const defaultChangeRule = { cost: item.cost.toFixed(2), texts: `${item.plu} ${item.texts.full_title}` }

const labelUnits = 'changeRule';
const defaultUnits = { amount: getUnits(item.type) }



function getUnits(type: string): string {
  if (type === ItemTypes.WEIGHED) {
    return 'г.';
  }
  return 'шт.';
}




storiesOf('SingleTableItem', module)
  .addDecorator(withKnobs)
  .add('no active', () => (
    <SingleTableItem
      item={object(label, defaultValue)}
      columns={array(labelColumns, defaultColumns) as Options}
      active={null}
      changeRule={object(labelChangeRule,defaultChangeRule)}
      addUnits={{ amount: getUnits(item.type) }}
      onClick={action('switch to active')}
    />
  ))
  .add('active', () => (
    <SingleTableItem
      item={object(label, defaultValue)}
      columns={array(labelColumns, defaultColumns) as Options}
      active={object(label, defaultValue)}
      changeRule={object(labelChangeRule,defaultChangeRule)}
      addUnits={{ amount: getUnits(item.type) }}
      onClick={action('switch to active')}
    />
  ))
