import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { object, array } from '@storybook/addon-knobs';

import { ItemTypes } from '../../enum/item.types';
import { AddedItemsTable } from './items.table';

const item = {
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
const items = [{...item},item,{...item},{...item},{...item},]


const styles = {
  width: '1200px',
  height: '600px',
}

storiesOf('AddedItemsTable', module)
  .addDecorator(withKnobs)
.addDecorator(story => <div style={styles}>{story()}</div>)
  .add('default', () => (
    <AddedItemsTable
    active={item}
    values={items}
    onClick={action('switch to active')}
    />
  ))

