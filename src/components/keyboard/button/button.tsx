import React, { useCallback, FC } from 'react';
import { Key, Actions } from '../keyboard.main/keyboard.interfaces';
import { useStylesButton } from './button.styles';

interface Props {
  callback: Actions;
  value: Key;
  className: string;
}

export const Button: FC<Props> = ({ callback, value, children = null, className }) => {
  const classes = useStylesButton();

  const onClick = useCallback(() => {
    callback(value);
  }, [value, callback]);

  return (
    <button className={`${className} ${classes.btn}`} type="button" onClick={onClick}>
      {children ?? value}
    </button>
  );
};
