import React, { FC } from 'react';
import { useStylesButton } from './button.styles';

interface Props {
  onClick: () => void;
  className: string;
  styles?: {}
}

export const Button: FC<Props> = (props) => {
  const { onClick, children = null, className } = props;
  const classes = useStylesButton(props.styles);

  return (
    <button className={`${className} ${classes.btn}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
};
