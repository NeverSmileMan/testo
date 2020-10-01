import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { object } from '@storybook/addon-knobs';

import { KeyboardMain } from './keyboard.main';
import { keyboardSettings } from './keyboard.settings';

const styles = {
  width: '1000px',
  height: '200px',
  fontSize: '18px',
  display: 'flex'
};


export const kkk = storiesOf('Keyboard/main', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => <div style={styles}>{story()}</div>)
  .add('default', () => (
    <KeyboardMain
      keyboardLayout={object('settings', keyboardSettings)}
      service={action('onClick') as any}
    />
  ))