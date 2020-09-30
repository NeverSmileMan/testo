import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ItemTypes } from '../../enum/item.types';
import { SingleTableItem } from './single.item';

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
  amount: 263,
};

function getUnits(type: string): string {
  if (type === ItemTypes.WEIGHED) {
    return 'г.';
  }
  return 'шт.';
}

// storiesOf('SingleTableItem', module)
//   .addDecorator(withKnobs)
//   .add('single.table.item', () => (
//     <SingleTableItem
//       item={item}
//       columns={['texts', 'amount', 'cost']}
//       active={null}
//       changeRule={{ cost: item.cost.toFixed(2), texts: `${item.plu} ${item.texts.full_title}` }}
//       addUnits={{ amount: getUnits(item.type) }}
//       onClick={action('clicked')}
//     />
//   ));

export default {
  title: 'SingleTableItem',
  component: SingleTableItem,
  argTypes: {
    item,
    changeRule: { cost: item.cost.toFixed(2), texts: `${item.plu} ${item.texts.full_title}` },
    columns: ['texts', 'amount', 'cost'],
    addUnits: { amount: getUnits(item.type) },
    active: {},
    onClick: () => {},
  },
  args: {
    // Now all Button stories will be primary.
    primary: true,
  },
} as Meta;
