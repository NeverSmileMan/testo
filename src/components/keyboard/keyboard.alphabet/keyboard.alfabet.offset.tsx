import React, { FC } from 'react';
import { useStylesAlphabet } from './keyboard.alphabet.styles';

interface Props {
  condition: boolean | number;
}

export const Offset: FC<Props> = (props) => {
  const { condition } = props;
  const classes = useStylesAlphabet();
  if (condition) {
    return <div className={classes.offset}></div>;
  }
  return <></>;
};
