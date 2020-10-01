import React, { FC } from 'react';
import { Button } from '../button/button';
import { Numeric, Key } from '../keyboard.main/keyboard.interfaces';

interface Props<T> {
  options: Numeric;
  onClick: (value: T) => void;
  classes: Record<any, string>;
}

export const KeyboardNumeric: FC<Props<string>> = (props) => {
  const { options, onClick, classes } = props;

  return (
    <div className={classes.keyboardNumeric}>
      {options.keys.map((item: Key, id: number) => (
        <Button
          key={item}
          onClick={()=>onClick(item)}
          className={`${classes[`nkey_${id}`]} ${classes.btn}`}
        >
        {item}
        </Button>
      ))}
    </div>
  );
};
