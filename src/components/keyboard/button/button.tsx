import React, { ReactElement, useCallback, ReactNode } from 'react';
import { Key, Actions } from '../keyboard.main/keyboard.interfaces';
import { useStylesButton } from './button.styles';

interface Props {
  callback: Actions;
  value?: Key;
  children?: ReactNode;
  className: string;
}

export default function Button({
  callback,
  value = '',
  children = null,
  className,
}: Props): ReactElement {
  const classes = useStylesButton();

  const onClick = useCallback(() => {
    callback(value);
  }, [value, callback]);

  return (
    <button className={`${className} ${classes.btn}`} type="button" onClick={onClick}>
      {children ?? value}
    </button>
  );
}

Button.defaultProps = {
  value: '',
  children: null,
};
