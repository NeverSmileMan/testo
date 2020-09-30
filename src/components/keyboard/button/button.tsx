import React, { useCallback, FC } from 'react';
import { useStylesButton } from './button.styles';

interface Props<T> {
  callback: (value: T) => void;
  value: T;
  className: T;
}

export const Button: FC<Props<string>> = (props) => {
  const { callback, value, children = null, className } = props;
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
