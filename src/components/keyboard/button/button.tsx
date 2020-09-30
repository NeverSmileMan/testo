import React, { useCallback, ReactElement } from 'react';
import { useStylesButton } from './button.styles';

interface Props<T> {
  callback: (value: T) => void;
  value: T;
  className: T;
}

export const Button = <T,>(props:React.PropsWithChildren<Props<T>>) : ReactElement => {
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
