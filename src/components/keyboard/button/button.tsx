import React, { ReactElement } from 'react';
import { useStylesButton } from './button.styles';

interface Props<T> {
  callback: () => void;
  className: T;
}

export const Button = <T,>(props:React.PropsWithChildren<Props<T>>) : ReactElement => {
  const { callback, children = null, className } = props;
  const classes = useStylesButton();

  return (
    <button className={`${className} ${classes.btn}`} type="button" onClick={callback}>
      {children}
    </button>
  );
};
