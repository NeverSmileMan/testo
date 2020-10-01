import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { object } from '@storybook/addon-knobs';

import { KeyboardNumeric } from './keyboard.numeric';
import { keyboardSettings } from '../keyboard.main/keyboard.settings';

const settings = { ...keyboardSettings.numeric };

const stylesDiv = {
  width: '200px',
  height: '200px',
  fontSize: '18px',
};
const styles = {
  background: 'grey',
  border: 'none',
  color: 'black',
  gridGap: '0.2em',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(4, 1fr)',
  height: '100%',
  gridColumn_0: '1',
  gridRow_0: '1',
  gridColumn_1: '2',
  gridRow_1: '1',
  gridColumn_2: '3',
  gridRow_2: '1',
  gridColumn_3: '1',
  gridRow_3: '2',
  gridColumn_4: '2',
  gridRow_4: '2',
  gridColumn_5: '3',
  gridRow_5: '2',
  gridColumn_6: '1',
  gridRow_6: '3',
  gridColumn_7: '2',
  gridRow_7: '3',
  gridColumn_8: '3',
  gridRow_8: '3',
  gridColumn_9: '1 / 4',
  gridRow_9: '4',
};

storiesOf('Keyboard/numeric', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => <div style={stylesDiv}>{story()}</div>)
  .add('default', () => (
    <KeyboardNumeric
      options={object('settings', settings)}
      onClick={action('onClick')}
      styles={object('styles', styles)}
    />
  ));
