import React, { ReactElement } from 'react';
import { Button } from '../button/button';
import { Numeric, Key, Actions } from '../keyboard.main/keyboard.interfaces';

interface Props {
  options: Numeric;
  onClick: Actions;
  classes: any;
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

export function KeyboardNumeric({ options, onClick, classes }: Props): ReactElement {
  
  return (
    <div className={classes.keyboardNumeric}>
      {options.keys.map((item: Key, id: number) => (
        <Button
          key={item}
          value={item}
          callback={onClick}
          className={`${classes[`nkey_${id}` as BtnClass]} ${classes.btnNumeric}`}
        />
      ))}
    </div>
  );
}
