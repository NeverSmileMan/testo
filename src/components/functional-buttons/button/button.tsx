import React from 'react';
import { ButtonProp } from './button.interface';
import { useStyles } from './button.style';

const Button = (prop: ButtonProp) => {
  const classes = useStyles(prop);
  return (
    <div
      onClick={prop.click}
      className={classes.btn}>
      {prop.buttonIcon()}
      <div>{prop.nameButton}</div>
    </div>
  )
}

export default Button;