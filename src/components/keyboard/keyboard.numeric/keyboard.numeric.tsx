import React, { FC } from 'react';
import { Button } from '../button/button';
import { Numeric, Key } from '../keyboard.main/keyboard.interfaces';
import { useStyles } from '../keyboard.numeric/keyboard.numeric.styles';

interface Props<T> {
  options: Numeric;
  onClick: (value: T) => void;
  styles?: {};
}

export const KeyboardNumeric: FC<Props<string>> = (props) => {
  const { options, onClick, styles } = props;
  const classes : Record<string, string> = useStyles(styles);

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
