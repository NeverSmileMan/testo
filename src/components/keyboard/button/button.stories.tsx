import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { text } from '@storybook/addon-knobs';

import { Button } from './button';

const styles = {
  width: '150px',
  height: '150px',
  fontSize: '24px',
  padding: '25px',
  border: '1px solid black',
};

const x = storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => <div style={styles}>{story()}</div>)
  .add('default', () => (
    <Button
      onClick={action('onClick')}
      className={''}
      children={<>{text('children', 'text')}</>}
    />
  ))
  console.log(x)