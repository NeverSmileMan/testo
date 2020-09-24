import React, { ReactElement } from 'react';
import Button from '../button/button';
import { Numeric, Key, Service, Actions } from '../keyboard.main/keyboard.interfaces';
import { useStylesNumeric } from './keyboard.numeric.styles';

interface Props {
  options: Numeric;
  service: Service;
}
type BtnClass =
  | 'nkey_0'
  | 'nkey_1'
  | 'nkey_2'
  | 'nkey_3'
  | 'nkey_4'
  | 'nkey_5'
  | 'nkey_6'
  | 'nkey_7'
  | 'nkey_8'
  | 'nkey_9';

export default function GroupNumericButtons({ options, service }: Props): ReactElement {
  const classes = useStylesNumeric();

  return (
    <div className={classes.keyboardNumeric}>
      {options.keys.map((item: Key, id: number) => (
        <Button
          key={item}
          value={item}
          callback={service[options.action] as Actions}
          className={`${classes[`nkey_${id}` as BtnClass]} ${classes.btnNumeric}`}
        />
      ))}
    </div>
  );
}
