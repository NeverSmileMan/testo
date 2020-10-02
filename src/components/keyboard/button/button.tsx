import React, { FC } from 'react';
import { useStyles } from './button.styles';

interface Props {
  onClick: () => void;
  className?: string;
  styles?: Record<string, unknown>;
}

export const Button: FC<Props> = (props) => {
  const { onClick, children = null, styles, className = '' } = props;
  const classes = useStyles(styles);

  return (
    <button className={`${className} ${classes.btn}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
};
