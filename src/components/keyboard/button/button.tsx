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
  children = {},
  className,
}: Props): ReactElement {
  const classes = useStylesButton();

  const onClick = useCallback(() => {
    callback(value);
  }, [value, callback]);

  return (
    <div
      className={`${className} ${classes.btn}`}
      onClick={onClick}
      role="button"
      tabIndex={-1}
      aria-hidden="true"
    >
      {children ?? value}
    </div>
  );
}

Button.defaultProps = {
  value: '',
  children: {},
};
