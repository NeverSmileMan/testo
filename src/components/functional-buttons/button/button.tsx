import React, {FC} from 'react';
import { ButtonProp } from './button.interface';
import { useStyles } from './button.style';

export const Button:FC<ButtonProp> = ({children, click}) => {
  const classes = useStyles()
  return (
    <button
      onClick={click}
      className={classes.btn}>
        {children}
      {/* {React.createElement(buttonIcon)}
      <div>{nameButton}</div> */}
    </button>
  )
}
